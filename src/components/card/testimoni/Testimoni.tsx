import React from 'react'
import Image from 'next/image'
import { MdFormatQuote } from "react-icons/md";

export default function Testimoni() {
  return (
    <>
        <div className='w-full flex flex-col gap-4 p-6 bg-brand-500 rounded-lg'>
            <div className='flex flex-col gap-2 items-center border-b border-white/80 pb-4'>
                <h1 className='text-white text-2xl font-bold'>Testimoni</h1>
                <p className='text-gray-300'>Apa yang mereka katakan tentang Edupath</p>
            </div>
            <div className='text-white flex gap-4'>
                <MdFormatQuote size={48}/>
                <div className=''>
                    <p className='text-lg '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <Image src="" alt='' height={0} width={0} />
                    <div className=''>
                        <p>Name</p>
                    </div>
                </div>
                <MdFormatQuote size={48}/>
            </div>
        </div>
    </>
  )
}
