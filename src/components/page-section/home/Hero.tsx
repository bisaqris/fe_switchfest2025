import React from 'react'
import Image from 'next/image'


export default function Hero() {
  return (
    <>
    <section id='#' className='w-full mt-10'>
      <div className='relative w-full'>
        <div className='absolute z-2 text-white w-3/5 items-center justify-center top-2/5 left-10 text-4xl'> Buka Potensi Diri, Rancang Masa Depan Karirmu Bersama Edupath!</div>
        <Image className='w-full -z-99999' objectFit='cover' alt=''src='/images/banner/home/banner.svg' width={1200} height={400}/>
      </div>
    </section>
  </>)
}
