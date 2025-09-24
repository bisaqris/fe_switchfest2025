import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Hero from '@/components/page-section/home/Hero';
import OurProgram from '@/components/page-section/home/OurProgram';
import WhyEduPath from '@/components/page-section/home/WhyEduPath';
import CourseList from '@/components/page-section/home/CourseList';
import Testimonial from '@/components/page-section/home/Testimonial';

export default function LandingPage() {
    return (
        <>
            <Head>
                <title>Selamat Datang di SwitchFest 2025</title>
                <meta name="description" content="Landing page sederhana untuk proyek SwitchFest 2025 dengan Next.js dan Tailwind CSS" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="min-h-screen flex flex-col bg-white text-gray-800 items-center">
                <main className="max-w-7xl flex flex-col gap-16">
                    <Hero/>
                    <OurProgram/>
                    <WhyEduPath/>
                    <CourseList/>
                    <Testimonial/>
                </main>
            </div>
        </>
    );
}