import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Hero from '@/components/page-section/infoloker/Hero';
import SearchOption from '@/components/page-section/infoloker/SearchOption';
import Content from '@/components/page-section/infoloker/Content';

export default function LandingPage() {
    return (
        <>
            <Head>
                <title>Edupath | Info Loker</title>
                <meta name="description" content="Landing page sederhana untuk proyek SwitchFest 2025 dengan Next.js dan Tailwind CSS" />
                <link rel="icon" href="/images/brand/logo.svg" />
            </Head>

            <div className="min-h-screen flex flex-col bg-white text-gray-800 items-center">
                <main className="w-7xl flex flex-col gap-16">
                    <Hero />
                    <div className='w-full flex flex-row gap-8'>
                        <SearchOption />
                        <Content />
                    </div>

                </main>
            </div>
        </>
    );
}