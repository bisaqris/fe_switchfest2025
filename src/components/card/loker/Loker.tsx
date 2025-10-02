import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdOutlineAttachMoney, MdOutlineLocationOn } from "react-icons/md";
import { BiBuildings } from "react-icons/bi";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { LuBriefcaseBusiness } from "react-icons/lu";


export default function Loker() {
  return (
    <>
      <div className='w-full h-auto border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-4'>
        <div className='flex flex-row gap-8'>
          <Image src="/images/card/loker1.png" alt="loker1" width={400} height={400} className='w-36 h-36 object-cover rounded-lg bg-gray-200' />
          <div className='flex flex-col gap-4 w-full'>
            <h1 className='text-2xl font-bold'>Title</h1>
            <div className='flex flex-col h-full justify-between'>
              <div className='flex flex-row gap-2 items-center text-sm text-gray-500'>
                <MdOutlineAttachMoney size={20} />
                <p className='text-base'>Rp.5000 - Rp10.0000.0000</p>
              </div>
              <div className='flex flex-row gap-2 items-center text-sm text-gray-500'>
                <BiBuildings size={20} />
                <p className='text-base'>PT Danang Kumala</p>
                  <p className='text-base font-bold'>Full-Time</p>
              </div>
              <div className='flex flex-row gap-2 items-center text-sm text-gray-500'>
                <div className='flex flex-row gap-2 items-center text-sm text-gray-500'>
                  <MdOutlineLocationOn size={20} />
                  <p className='text-base'>Kota Administrasi Jakarta</p>
                </div>
                <div className='flex flex-row gap-2 items-center text-sm text-gray-500'>
                  <LuBriefcaseBusiness size={20} />
                  <p className='text-base'>5 Tahun</p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col justify-between items-end'>
            <IoBookmarkOutline size={20} className='text-gray-500 hover:text-gray-700 cursor-pointer' />
            <div className=''>
              <p className='text-sm text-end text-gray-500'>
                Dibuat pada <span className='font-bold'> 01 Maret 2025</span>
              </p>
              <p className='text-sm text-end text-gray-500'>
                Pendaftaran terakhir <span className='font-bold'> 31 Maret 2025 </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
