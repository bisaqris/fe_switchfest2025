import React from 'react'
import Image from 'next/image'

export default function Hero() {
    return (
        <>
            <section id='#' className='w-full mt-10'>
                <div className='relative w-full'>
                    <div className='absolute z-2 text-white w-3/5 items-center justify-center top-2/5 left-10 '>
                    <p className='text-sm text-gray-100 font-bold'>
                        Info Loker by Edupath
                    </p>
                    <h1 className='text-4xl pt-1'>
                        Buka Potensi Diri, Rancang Masa Depan Karirmu Bersama Edupath!
                    </h1>
                    </div>
                    <Image className='w-full -z-99999' objectFit='cover' alt='' src='/images/banner/default/banner.svg' width={1200} height={400} />
                </div>
            </section>
        </>
    )
}
