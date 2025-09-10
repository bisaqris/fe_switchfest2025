import React, { useState, FormEvent, ChangeEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { LuChevronLeft, LuEye, LuEyeClosed } from 'react-icons/lu';
import { useAuth } from '@/layout/AuthContext';
import axios from 'axios';

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isTermsChecked) {
      setError('Anda harus menyetujui Syarat dan Ketentuan.');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const response = await axios.post(`${apiUrl}/auth/register`, {
        name,
        email: formData.email,
        password: formData.password,
      });
      const { token } = response.data;

      console.log('Registrasi berhasil, token diterima:', token);
      login(token)
      router.push('/dashboard');

    } catch (err: any) {
      console.log(err)
      setError(err.response?.data?.message || 'Gagal untuk mendaftar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | SwitchFest 2025</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">

        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg dark:bg-gray-800">

          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
              Buat Akun Baru
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Buat akun untuk memulai perjalanan Anda!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Nama Depan <span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  defaultValue={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nama Belakang <span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  defaultValue={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email <span className="text-error-500">*</span></Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                defaultValue={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password <span className="text-error-500">*</span></Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  placeholder="Minimal 8 karakter"
                  type={showPassword ? "text" : "password"}
                  defaultValue={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-10 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <LuEye size={20} className="text-gray-500" />
                  ) : (
                    <LuEyeClosed size={20} className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={isTermsChecked}
                onChange={setIsTermsChecked}
              />
              <Label htmlFor="terms" className="text-sm font-normal cursor-pointer mb-0">
                Saya setuju dengan{' '}
                <Link href="/terms" className="font-medium text-blue-600 hover:underline">
                  Syarat & Ketentuan
                </Link>
              </Label>
            </div>

            {error && <p className="text-sm text-center text-red-500">{error}</p>}

            <div>
              <Button type="submit" className="w-full" disabled={isLoading || !isTermsChecked}>
                {isLoading ? 'Mendaftar...' : 'Sign Up'}
              </Button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Sudah punya akun?{' '}
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}