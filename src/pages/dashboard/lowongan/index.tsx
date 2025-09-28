import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import apiClient from '@/lib/apiClient';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import LowonganForm from '@/components/dashboard/lowongan';
import Link from 'next/link';

type Company = {
    id: string;
    name: string;
};

type Lowongan = {
    id: string;
    title: string;
    description: string;
    location: string;
    jobType: 'FullTime' | 'PartTime' | 'Contract' | 'Internship';
    salaryRange?: string | null;
    company: Company;
    _count: {
    candidates: number;
  };
};

export default function LowonganPage() {
    const [lowonganList, setLowonganList] = useState<Lowongan[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingLowongan, setEditingLowongan] = useState<Lowongan | null>(null);
    const { isOpen, openModal, closeModal } = useModal();

    const fetchLowongan = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/lowongan');
            setLowonganList(response.data.data);
        } catch (error) {
            toast.error('Gagal mengambil data lowongan.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLowongan();
    }, []);

    const handleAddLowongan = () => {
        setEditingLowongan(null);
        openModal();
    };

    const handleEditLowongan = (lowongan: Lowongan) => {
        setEditingLowongan(lowongan);
        openModal();
    };

    const handleDeleteLowongan = async (lowonganId: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
            try {
                await apiClient.delete(`/lowongan/${lowonganId}`);
                toast.success('Lowongan berhasil dihapus.');
                fetchLowongan();
            } catch (error) {
                toast.error('Gagal menghapus lowongan.');
                console.error(error);
            }
        }
    };

    if (loading) {
        return <div>Loading lowongan...</div>;
    }

    return (
        <>
            <Head>
                <title>Manajemen Lowongan | Dashboard</title>
            </Head>

            <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Daftar Lowongan Pekerjaan</h2>
                    <button
                        onClick={handleAddLowongan}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Tambah Lowongan
                    </button>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Posisi</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Perusahaan</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Lokasi</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Tipe</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lowonganList.map((lowongan) => (
                                    <tr key={lowongan.id} className="dark:border-white/[0.05]">
                                        <td className="px-4 py-4 whitespace-nowrap font-medium">{lowongan.title}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{lowongan.company.name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{lowongan.location}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{lowongan.jobType}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <Link
                                                    href={`/dashboard/lowongan/${lowongan.id}`}
                                                    className="text-sm text-blue-500 hover:underline"
                                                >
                                                    Lihat Kandidat ({lowongan._count.candidates})
                                                </Link>
                                                <button onClick={() => handleEditLowongan(lowongan)} className="...">Edit</button>
                                                <button onClick={() => handleDeleteLowongan(lowongan.id)} className="...">Hapus</button>
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
                <LowonganForm
                    lowongan={editingLowongan}
                    onSuccess={() => {
                        fetchLowongan();
                        closeModal();
                    }}
                    onClose={closeModal}
                />
            </Modal>
        </>
    );
}