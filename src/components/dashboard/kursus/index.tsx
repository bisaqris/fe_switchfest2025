import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-hot-toast';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import TextAreaInput from '@/components/form/form-elements/TextAreaInput';

type Kursus = {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: number;
};

interface KursusFormProps {
    kursus: Kursus | null;
    onSuccess: () => void;
    onClose: () => void;
}

export default function KursusFormModal({ kursus, onSuccess, onClose }: KursusFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        duration: 0,
    });
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = kursus !== null;

    useEffect(() => {
        if (isEditing) {
            setFormData({
                title: kursus.title,
                description: kursus.description,
                instructor: kursus.instructor,
                duration: kursus.duration,
            });
        } else {
            setFormData({ title: '', description: '', instructor: '', duration: 0 });
        }
    }, [kursus, isEditing]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'duration' ? parseInt(value, 10) : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(formData);
        try {
            if (isEditing) {
                await apiClient.patch(`/kursus/${kursus.id}`, formData);
                toast.success('Kursus berhasil diperbarui!');
            } else {
                await apiClient.post('/kursus', formData);
                toast.success('Kursus berhasil ditambahkan!');
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
                {isEditing ? 'Edit Kursus' : 'Tambah Kursus Baru'}
            </h4>
            <div className="flex flex-col gap-5">
                <div>
                    <Label htmlFor="title">Judul Kursus*</Label>
                    <Input id="title" name="title" type="text" placeholder="Dasar-Dasar React" defaultValue={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="instructor">Nama Instruktur*</Label>
                    <Input id="instructor" name="instructor" type="text" placeholder="John Doe" defaultValue={formData.instructor} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="duration">Durasi (dalam menit)*</Label>
                    <Input id="duration" name="duration" type="number" placeholder="90" defaultValue={formData.duration} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="description">Deskripsi Kursus*</Label>
                    <TextAreaInput id='description' name='description' value={formData.description} onChange={handleChange} required />
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