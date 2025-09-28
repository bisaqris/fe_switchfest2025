import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import apiClient from '@/lib/apiClient';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/modal';
import KursusFormModal from '@/components/dashboard/kursus';

type Kursus = {
    id: string;
    title: string;
    description: string;
    duration: number;
    instructor: string;
    enrolledUsers: string;
};

export default function KursusPage() {
    const [kursus, setKursus] = useState<Kursus[]>([]);
    const [loading, setLoading] = useState(true);

    const [editingKursus, setEditingKursus] = useState<Kursus | null>(null);

    const { isOpen, openModal, closeModal } = useModal();

    const fetchKursuss = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/kursus');
            setKursus(response.data.data);
        } catch (error) {
            toast.error('Gagal mengambil data pengguna.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKursuss();
    }, []);

    const handleAddKursus = () => {
        setEditingKursus(null);
        openModal();
    };

    const handleEditKursus = (kursus: Kursus) => {
        setEditingKursus(kursus);
        openModal();
    };

    const handleDeleteKursus = async (kursusId: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            try {
                await apiClient.delete(`/kursus/${kursusId}`);
                toast.success('Pengguna berhasil dihapus.');
                fetchKursuss();
            } catch (error) {
                toast.error('Gagal menghapus pengguna.');
                console.error(error);
            }
        }
    };

    if (loading) {
        return <div>Loading kursus...</div>;
    }

    return (
        <>
            <Head>
                <title>Manajemen Course | Dashboard</title>
            </Head>

            <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Daftar Course</h2>
                    <button
                        onClick={handleAddKursus}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Tambah Course
                    </button>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Title</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Description</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Instructor</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Duration</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Enrolled Users</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kursus.map((kursus) => (
                                    <tr key={kursus.id} className="dark:border-white/[0.05]">
                                        <td className="px-4 py-4 whitespace-nowrap">{kursus.title}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{kursus.description}</td>
                                        <td className="px-4 py-4 whitespace-nowrap capitalize">{kursus.instructor}</td>
                                        <td className="px-4 py-4 whitespace-nowrap capitalize">{kursus.duration}</td>
                                        <td className="px-4 py-4 whitespace-nowrap capitalize">{kursus.enrolledUsers ?? 0}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEditKursus(kursus)} className="text-gray-500 hover:text-blue-500">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDeleteKursus(kursus.id)} className="text-gray-500 hover:text-red-500">
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
                <KursusFormModal
                    kursus={editingKursus}
                    onSuccess={() => {
                        fetchKursuss();
                        closeModal();
                    }}
                    onClose={closeModal}
                />
            </Modal>
        </>
    );
}