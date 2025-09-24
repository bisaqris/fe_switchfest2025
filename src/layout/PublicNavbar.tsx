import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80  backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
        <div className='flex gap-x-2'>
          <Image src="/images/brand/logo.svg" alt="" width={32} height={32} className='' />
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-brand-500 dark:text-white">
              SwitchFest
            </a>
          </Link>
        <div className='flex items-center gap-x-6 px-8'>
          <Link href="/"  legacyBehavior>
          <a className="text-brand-400 hover:scale-105 hover:text-brand-500 trasnition duration-100">
            Home
          </a>
          </Link>
          <Link href=""  legacyBehavior>
          <a className="text-brand-400 hover:scale-105 hover:text-brand-500 trasnition duration-100">
            E-Learning
          </a>
          </Link>
          <Link href=""  legacyBehavior>
          <a className="text-brand-400 hover:scale-105 hover:text-brand-500 trasnition duration-100">
            Info Loker
          </a>
          </Link>
          <Link href=""  legacyBehavior>
          <a className="text-brand-400 hover:scale-105 hover:text-brand-500 trasnition duration-100">
            Komunitas
          </a>
          </Link>
        </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/signin" legacyBehavior>
            <a className="px-4 py-2 outline-2 outline-brand-500 hover:outline-brand-400 rounded-lg text-brand-500 hover:text-brand-400 hover:bg-brand-25 transition-colors">
              Sign In
            </a>
          </Link>
          <Link href="/auth/signup" legacyBehavior>
            <a className="px-4 py-2 text-white bg-brand-500 rounded-lg shadow-md hover:bg-brand-400 transition-colors">
              Sign Up
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}