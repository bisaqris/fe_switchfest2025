import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import apiClient from '@/lib/apiClient';
import Select from '@/components/form/Select';

type Kandidat = {
    id: string;
    status: 'Applied' | 'Reviewed' | 'Interviewing' | 'Offered' | 'Hired' | 'Rejected';
    resumeUrl: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};

export default function KandidatPage() {
    const router = useRouter();
    const { jobId } = router.query;

    const [candidates, setCandidates] = useState<Kandidat[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCandidates = useCallback(async () => {
        if (!jobId) return;

        try {
            setLoading(true);
            const response = await apiClient.get(`/lowongan/${jobId}/candidates`);
            setCandidates(response.data.data);
        } catch (error) {
            toast.error('Gagal mengambil data kandidat.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [jobId]);

    useEffect(() => {
        fetchCandidates();
    }, [fetchCandidates]);

    const handleStatusChange = async (kandidatId: string, newStatus: string) => {
        try {
            await apiClient.patch(`/kandidat/${kandidatId}/status`, { status: newStatus });
            toast.success('Status kandidat berhasil diperbarui.');
            fetchCandidates()
        } catch (error) {
            toast.error('Gagal memperbarui status.');
            console.error(error);
        }
    };


    if (loading) {
        return <div>Loading kandidat...</div>;
    }

    return (
        <>
            <Head>
                <title>Manajemen Kandidat | Dashboard</title>
            </Head>

            <div className="p-4 md:p-6">
                <div className="mb-6">
                    <Link href="/dashboard/lowongan" className="text-blue-500 hover:underline">
                        &larr; Kembali ke Daftar Lowongan
                    </Link>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mt-2">
                        Daftar Kandidat
                    </h2>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="max-w-full overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Nama Kandidat</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Email</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Resume</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-400">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.length > 0 ? (
                                    candidates.map((kandidat) => (
                                        <tr key={kandidat.id} className="dark:border-white/[0.05]">
                                            <td className="px-4 py-4 whitespace-nowrap font-medium">{kandidat.user.name}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">{kandidat.user.email}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <a href={kandidat.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                    Lihat Resume
                                                </a>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <Select
                                                    value={kandidat.status}
                                                    onChange={(e) => handleStatusChange(kandidat.id, e.target.value)}
                                                    options={[
                                                        { value: 'Applied', label: 'Applied' },
                                                        { value: 'Reviewed', label: 'Reviewed' },
                                                        { value: 'Interviewing', label: 'Interviewing' },
                                                        { value: 'Offered', label: 'Offered' },
                                                        { value: 'Hired', label: 'Hired' },
                                                        { value: 'Rejected', label: 'Rejected' },
                                                    ]}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center py-10 text-gray-500">
                                            Belum ada kandidat yang melamar.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}