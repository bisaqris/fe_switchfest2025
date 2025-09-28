import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-hot-toast';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import Select from '@/components/form/Select';
import TextareaInput from '@/components/form/form-elements/TextAreaInput';

type Lowongan = {
    id: string;
    title: string;
    description: string;
    location: string;
    jobType: 'FullTime' | 'PartTime' | 'Contract' | 'Internship';
    salaryRange?: string | null;
};

interface LowonganFormProps {
    lowongan: Lowongan | null;
    onSuccess: () => void;
    onClose: () => void;
}

export default function LowonganForm({ lowongan, onSuccess, onClose }: LowonganFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        jobType: 'FullTime',
        salaryRange: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = lowongan !== null;

    const jobTypeOptions = [
        { value: 'FullTime', label: 'Full Time' },
        { value: 'PartTime', label: 'Part Time' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Internship', label: 'Internship' },
    ];

    useEffect(() => {
        if (isEditing) {
            setFormData({
                title: lowongan.title,
                description: lowongan.description,
                location: lowongan.location,
                jobType: lowongan.jobType,
                salaryRange: lowongan.salaryRange || '',
            });
        }
    }, [lowongan, isEditing]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                await apiClient.patch(`/lowongan/${lowongan.id}`, formData);
                toast.success('Lowongan berhasil diperbarui!');
            } else {
                await apiClient.post('/lowongan', formData);
                toast.success('Lowongan berhasil ditambahkan!');
            }
            onSuccess();
            onClose();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Terjadi kesalahan.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
                {isEditing ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}
            </h4>
            <div className="flex flex-col gap-5">
                <div>
                    <Label htmlFor="title">Judul Posisi*</Label>
                    <Input id="title" name="title" type="text" placeholder="Software Engineer" defaultValue={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="location">Lokasi*</Label>
                    <Input id="location" name="location" type="text" placeholder="Jakarta, Indonesia" defaultValue={formData.location} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="jobType">Tipe Pekerjaan*</Label>
                    <Select id="jobType" name="jobType" value={formData.jobType} onChange={handleChange} options={jobTypeOptions} required />
                </div>
                <div>
                    <Label htmlFor="salaryRange">Rentang Gaji (Opsional)</Label>
                    <Input id="salaryRange" name="salaryRange" type="text" placeholder="Rp 5 Juta - 7 Juta" defaultValue={formData.salaryRange} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor="description">Deskripsi Pekerjaan*</Label>
                    <TextareaInput id="description" name="description" placeholder="Jelaskan tentang tanggung jawab posisi ini..." value={formData.description} onChange={handleChange} required />
                </div>
            </div>
            <div className="flex items-center justify-end w-full gap-3 mt-6">
                <Button type="button" size="sm" variant="outline" onClick={onClose}>
                    Batal
                </Button>
                <Button type="submit" size="sm" disabled={isLoading}>
                    {isLoading ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </div>
        </form>
    );
}