
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import apiClient from '@/lib/apiClient';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import CommunityForm from '@/components/dashboard/community';

type Community = {
  id: string;
  name: string;
  description: string;
  coverImageUrl?: string | null;
  _count: {
    members: number;
  };
};

export default function CommunityPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/community');
      setCommunities(response.data.data);
    } catch (error) {
      toast.error('Gagal mengambil data komunitas.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleAddCommunity = () => {
    setEditingCommunity(null);
    openModal();
  };

  const handleEditCommunity = (community: Community) => {
    setEditingCommunity(community);
    openModal();
  };

  const handleDeleteCommunity = async (communityId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus komunitas ini?')) {
      try {
        await apiClient.delete(`/community/${communityId}`);
        toast.success('Komunitas berhasil dihapus.');
        fetchCommunities();
      } catch (error) {
        toast.error('Gagal menghapus komunitas.');
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div>Loading communities...</div>;
  }

  return (
    <>
      <Head>
        <title>Manajemen Komunitas | Dashboard</title>
      </Head>

      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Daftar Komunitas</h2>
          <button
            onClick={handleAddCommunity}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Tambah Komunitas
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Sampul</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Nama</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Deskripsi</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Anggota</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {communities.map((community) => (
                  <tr key={community.id} className="dark:border-white/[0.05]">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Image
                        src={community.coverImageUrl || 'https://placehold.co/400?text=Placeholder&font=roboto'}
                        alt={community.name}
                        width={64}
                        height={64}
                        className="object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-medium">{community.name}</td>
                    <td className="px-4 py-4 whitespace-normal max-w-xs truncate">{community.description}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{community._count.members}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditCommunity(community)} className="text-gray-500 hover:text-blue-500">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteCommunity(community.id)} className="text-gray-500 hover:text-red-500">
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
        <CommunityForm
          community={editingCommunity}
          onSuccess={() => {
            fetchCommunities();
            closeModal();
          }}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
}