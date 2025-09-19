import React from 'react'
import { GoBook, GoPeople } from "react-icons/go";

export default function OurProgram() {
  return (
    <>
      <section id='#ourprogram' className='w-full'>
        <div className='w-full flex flex-col'>
          <h1 className='text-4xl font-semibold text-center py-8 text-gray-700'><span className='text-brand-500'>Program</span> Kami</h1>
          <div className='flex flex-col md:flex-row w-full gap-6'>
            <div className='w-full outline-2 rounded-md outline-gray-300 flex flex-col items-center p-4'>
              <div className='flex flex-row-reverse items-center font-semibold gap-x-4 text-xl text-brand-500'>
                E-Learning
              <div className='p-3 rounded-full bg-brand-100'>
                <GoBook size={24} className='text-brand-500'/>
                <div className='w-fit bg-brand-100 rounded-full'/>
              </div>
              </div>
              <div></div>
            </div>
            <div className='w-full outline-2 rounded-md outline-gray-300 flex flex-col items-center p-4'>
              <div className='flex flex-row-reverse items-center font-semibold gap-x-4 text-xl text-brand-500'>
                Info Loker
              <div className='p-3 rounded-full bg-brand-100'>
                <GoPeople size={24} className='text-brand-500'/>
                <div className='w-fit bg-brand-100 rounded-full'/>
              </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
