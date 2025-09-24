import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function CourseV2() {
    return (
        <>
            <div className='w-full group'>
                <Link href="">
                    <Image src="" width={284} height={164} alt='' className='w-full bg-gray-400 outline-none ' />
                    <div className='px-4 py-2 bg-gradient-to-r from-white from-60% to-brand-400 text-xl'>Title</div>
                </Link>
            </div>
        </>
    )
}


