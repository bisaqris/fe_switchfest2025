import Link from 'next/link';
import React from 'react';

export default function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto flex justify-between items-center px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-bold text-gray-900 dark:text-white">
            SwitchFest
          </a>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/auth/signin" legacyBehavior>
            <a className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Sign In
            </a>
          </Link>
          <Link href="/auth/signup" legacyBehavior>
            <a className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              Sign Up
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}