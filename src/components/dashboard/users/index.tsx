// src/components/admin/UserForm.tsx

import React, { useState, useEffect, FormEvent } from 'react';
import apiClient from '@/lib/apiClient';
import { toast } from 'react-hot-toast';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';

type User = {
  id: string;
  name: string;
  email: string;
};

interface UserFormProps {
  user: User | null;
  onSuccess: () => void;
  onClose: () => void;
}

export default function UserForm({ user, onSuccess, onClose }: UserFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = user !== null;

  useEffect(() => {
    if (isEditing) {
      setFormData({ name: user.name, email: user.email, password: '' });
    }
  }, [user, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing) {
        await apiClient.patch(`/users/${user.id}`, { name: formData.name, email: formData.email });
        toast.success('Pengguna berhasil diperbarui!');
      } else {
        await apiClient.post('/users', formData);
        toast.success('Pengguna berhasil ditambahkan!');
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      console.log("WOYYY ERROR")
      console.log(error.response?.data?.message)
      toast.error(error.response?.data?.message || 'Terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
        {isEditing ? 'Edit Informasi Pengguna' : 'Tambah Pengguna Baru'}
      </h4>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input id="name" name="name" type="text" placeholder="John Doe" defaultValue={formData.name} onChange={handleChange} required />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" defaultValue={formData.email} onChange={handleChange} required />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="password">
            Password {isEditing && <span className="text-sm text-gray-400">(Kosongkan jika tidak ingin diubah)</span>}
          </Label>
          <Input id="password" name="password" type="password" defaultValue={formData.password} onChange={handleChange} required={!isEditing} />
        </div>
      </div>
      <div className="flex items-center justify-end w-full gap-3 mt-6">
        <Button type="button" size="sm" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </form>
  );
}