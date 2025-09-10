import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function LandingPage() {
    return (
        <>
            <Head>
                <title>Selamat Datang di SwitchFest 2025</title>
                <meta name="description" content="Landing page sederhana untuk proyek SwitchFest 2025 dengan Next.js dan Tailwind CSS" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">

                <main className="flex-grow flex items-center">
                    <div className="container mx-auto text-center px-4 py-16 sm:py-24">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Bangun Masa Depan Digital Anda
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
                            Bergabunglah dalam kompetisi, asah kemampuan Anda, dan jadilah bagian dari inovasi teknologi informasi bersama kami.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link href="/auth/signup" legacyBehavior>
                                <a className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-transform hover:scale-105">
                                    Daftar Sekarang
                                </a>
                            </Link>
                            <Link href="/about" legacyBehavior>
                                <a className="px-8 py-3 text-lg font-medium text-gray-700 bg-gray-100 rounded-lg shadow-lg dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-transform hover:scale-105">
                                    Pelajari Lebih Lanjut
                                </a>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}