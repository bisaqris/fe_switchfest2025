import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineLinkedin, AiOutlineYoutube, AiOutlineInstagram } from "react-icons/ai"

export default function PublicFooter() {
    return (
        <footer className="mt-24 px-24 py-16 bg-brand-500">
            <div className="container mx-auto text-center py-6 px-4">
                <div className='grid grid-cols-4 gap-y-8 gap-x-16'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex gap-x-4 justify-start items-center'>
                            <Image src="/images/brand/logo-white.svg" alt="" width={64} height={64} className='' />
                            <div className='flex flex-col items-start'>
                                <h2 className="text-2xl font-bold text-white">
                                    Edupath
                                </h2>
                                <p className='text-start text-gray-300 text-sm'>
                                    Uncover your potential, choose your <br /> path,  reach your dream
                                </p>
                            </div>
                        </div>
                        <div className='flex gap-x-2 items-center text-white'>
                            <AiOutlineLinkedin size={28} />
                            <AiOutlineInstagram size={28} />
                            <AiOutlineYoutube size={36} />
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex'>
                            <h1 className='text-white uppercase'>Quick Links</h1>
                        </div>
                        <div className='flex flex-col gap-y-2 mt-2 text-gray-300 text-start'>
                            <Link href="" legacyBehavior>
                                <a>Home</a>
                            </Link>
                            <Link href="" legacyBehavior>
                                <a>E-Learning</a>
                            </Link>
                            <Link href="" legacyBehavior>
                                <a>Info Loker</a>
                            </Link>
                            <Link href="" legacyBehavior>
                                <a>Komunitas</a>
                            </Link>
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex'>
                            <h1 className='text-white uppercase'>Edupath</h1>
                        </div>
                        <div className='flex flex-col gap-y-2 mt-2 text-gray-300 text-start'>
                            <Link href="" legacyBehavior>
                                <a>Home</a>
                            </Link>
                            <Link href="" legacyBehavior>
                                <a>E-Learning</a>
                            </Link>
                            <Link href="" legacyBehavior>
                                <a>Info Loker</a>
                            </Link>
                            <Link href="" legacyBehavior>
                                <a>Komunitas</a>
                            </Link>
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex'>
                            <h1 className='text-white uppercase'>Lainnya</h1>
                        </div>
                        <div className='flex flex-col gap-y-2 mt-2 text-gray-300 text-start'>
                            <Link href="" legacyBehavior>
                                <a>FAQ</a>
                            </Link>
                            <Link href="" legacyBehavior>
                                <a>Syarat & Ketentuan</a>
                            </Link>
                            <Link href="" legacyBehavior>
                                <a>Ketentuan Privasi</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}