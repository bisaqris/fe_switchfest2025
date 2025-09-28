import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import apiClient from '@/lib/apiClient';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import CompanyForm from '@/components/dashboard/company';

type Company = {
  id: string;
  name: string;
  description: string;
  website?: string | null;
  location: string;
  logoUrl?: string | null;
};

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/company');
      setCompanies(response.data.data);
    } catch (error) {
      toast.error('Gagal mengambil data perusahaan.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = () => {
    setEditingCompany(null);
    openModal();
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    openModal();
  };

  const handleDeleteCompany = async (companyId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus perusahaan ini?')) {
      try {
        await apiClient.delete(`/company/${companyId}`);
        toast.success('Perusahaan berhasil dihapus.');
        fetchCompanies();
      } catch (error) {
        toast.error('Gagal menghapus perusahaan.');
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div>Loading companies...</div>;
  }

  return (
    <>
      <Head>
        <title>Manajemen Perusahaan | Dashboard</title>
      </Head>

      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Daftar Perusahaan</h2>
          <button
            onClick={handleAddCompany}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Tambah Perusahaan
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Logo</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Nama Perusahaan</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Lokasi</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Website</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id} className="dark:border-white/[0.05]">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Image
                        src={company.logoUrl || 'https://placehold.co/400?text=Placeholder&font=roboto'}
                        alt={company.name}
                        width={40}
                        height={40}
                        className="object-contain rounded-md"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-medium">{company.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{company.location}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <a href={company.website || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {company.website || "N/A"}
                      </a>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditCompany(company)} className="text-gray-500 hover:text-blue-500">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteCompany(company.id)} className="text-gray-500 hover:text-red-500">
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[584px] p-5 lg:p-10"
      >
        <CompanyForm
          company={editingCompany}
          onSuccess={() => {
            fetchCompanies();
            closeModal();
          }}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
}