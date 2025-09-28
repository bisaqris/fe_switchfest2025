import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-hot-toast';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import TextareaInput from '@/components/form/form-elements/TextAreaInput';
import { useAuth } from '@/layout/AuthContext';

type Company = {
  id: string;
  name: string;
  description: string;
  website?: string | null;
  location: string;
  logoUrl?: string | null;
};

interface CompanyFormProps {
  company: Company | null;
  onSuccess: () => void;
  onClose: () => void;
}

export default function CompanyForm({ company, onSuccess, onClose }: CompanyFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = company !== null;

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: company.name,
        description: company.description,
        website: company.website || '',
        location: company.location,
      });
    }
  }, [company, isEditing]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('description', formData.description);
    dataToSend.append('website', formData.website);
    dataToSend.append('location', formData.location);
    if (logoFile) {
      dataToSend.append('logoUrl', logoFile);
    }

    try {
      if (isEditing) {
        await apiClient.patch(`/company/${company.id}`, dataToSend);
        toast.success('Perusahaan berhasil diperbarui!');
      } else {
        await apiClient.post('/company', dataToSend);
        toast.success('Perusahaan berhasil ditambahkan!');
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
        {isEditing ? 'Edit Perusahaan' : 'Tambah Perusahaan Baru'}
      </h4>
      <div className="flex flex-col gap-5">
        {user?.role === 'admin' && (
          <div>
            <Label htmlFor="id">ID Perusahaan*</Label>
            <Input id="id" name="id" type="text" defaultValue={company?.id} disabled />
          </div>
        )}
        <div>
          <Label htmlFor="name">Nama Perusahaan*</Label>
          <Input id="name" name="name" type="text" placeholder="PT. Maju Jaya" defaultValue={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="location">Lokasi*</Label>
          <Input id="location" name="location" type="text" placeholder="Jakarta, Indonesia" defaultValue={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="website">Website (Opsional)</Label>
          <Input id="website" name="website" type="text" placeholder="https://majujaya.com" defaultValue={formData.website} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="description">Deskripsi*</Label>
          <TextareaInput id="description" name="description" placeholder="Deskripsi singkat tentang perusahaan..." value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="logoUrl">Logo Perusahaan (Opsional)</Label>
          <Input id="logoUrl" name="logoUrl" type="file" onChange={handleFileChange} />
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