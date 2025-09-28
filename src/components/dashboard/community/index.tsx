import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-hot-toast';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import TextareaInput from '@/components/form/form-elements/TextAreaInput';

type Community = {
    id: string;
    name: string;
    description: string;
    coverImageUrl?: string | null;
    _count: { members: number };
};

interface CommunityFormProps {
    community: Community | null;
    onSuccess: () => void;
    onClose: () => void;
}

export default function CommunityForm({ community, onSuccess, onClose }: CommunityFormProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = community !== null;

    useEffect(() => {
        if (isEditing) {
            setName(community.name);
            setDescription(community.description);
        }
    }, [community, isEditing]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (coverImageFile) {
            formData.append('coverImageUrl', coverImageFile);
        }

        try {
            if (isEditing) {
                await apiClient.patch(`/community/${community.id}`, formData);
                toast.success('Komunitas berhasil diperbarui!');
            } else {
                await apiClient.post('/community', formData);
                toast.success('Komunitas berhasil ditambahkan!');
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
                {isEditing ? 'Edit Komunitas' : 'Tambah Komunitas Baru'}
            </h4>
            <div className="flex flex-col gap-5">
                <div>
                    <Label htmlFor="name">Nama Komunitas*</Label>
                    <Input id="name" name="name" type="text" placeholder="Komunitas Developer React" defaultValue={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="description">Deskripsi*</Label>
                    <TextareaInput id="description" name="description" placeholder="Deskripsi singkat tentang komunitas..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="coverImage">Gambar Sampul (Opsional)</Label>
                    <Input id="coverImage" name="coverImage" type="file" onChange={handleFileChange} />
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