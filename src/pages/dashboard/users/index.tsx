import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import UserFormModal from '@/components/dashboard/users';
import apiClient from '@/lib/apiClient';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { isOpen, openModal, closeModal } = useModal();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/users');
      setUsers(response.data.data);
    } catch (error) {
      toast.error('Gagal mengambil data pengguna.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    openModal();
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    openModal();
  };

  const handleDeleteUser = async (userId: string) => {
    console.log(userId);
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      try {
        await apiClient.delete(`/users/${userId}`);
        toast.success('Pengguna berhasil dihapus.');
        fetchUsers();
      } catch (error) {
        toast.error('Gagal menghapus pengguna.');
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <>
      <Head>
        <title>Manajemen Pengguna | Admin Dashboard</title>
      </Head>

      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Daftar Pengguna</h2>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Tambah Pengguna
          </button>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Nama</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Role</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="dark:border-white/[0.05]">
                    <td className="px-4 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-4 py-4 whitespace-nowrap capitalize">{user.role}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditUser(user)} className="text-gray-500 hover:text-blue-500">
                          Edit
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)} className="text-gray-500 hover:text-red-500">
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
        className="max-w-[584px] p-5 lg:p-10">
        <UserFormModal
          user={editingUser}
          onSuccess={() => {
            fetchUsers();
            closeModal();
          }}
          onClose={closeModal}
        />
      </Modal>
    </>
  );
}