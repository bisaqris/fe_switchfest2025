import React, { useState, FormEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Checkbox from '@/components/form/input/Checkbox';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import axios from 'axios';
import { useAuth } from '@/layout/AuthContext';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      const { token } = response.data;
      toast.success('Login berhasil! Mengarahkan ke dasboard...');
      console.log('Login berhasil, token:', token);
      login(token)
      router.push('/dashboard');

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Terjadi kesalahan saat login.';
      toast.error(errorMessage);
      console.log(errorMessage)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In | SwitchFest 2025</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-xl p-8 space-y-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
              Selamat Datang Kembali!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Silakan masuk untuk melanjutkan.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-10 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? <LuEye size={20} className="text-gray-500" /> : <LuEyeClosed size={20} className="text-gray-500" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="rememberMe" checked={rememberMe} onChange={setRememberMe} />
                <Label htmlFor="rememberMe" className="ml-2 mb-0 font-normal cursor-pointer">
                  Ingat saya
                </Label>
              </div>
              <Link href="/auth/reset-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Lupa password?
              </Link>
            </div>

            {error && <p className="text-sm text-center text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Belum punya akun?{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}