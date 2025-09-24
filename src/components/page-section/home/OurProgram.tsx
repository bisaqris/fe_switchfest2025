import React from 'react'
import { GoBook, GoPeople } from "react-icons/go";

export default function OurProgram() {
  return (
    <>
      <section id='#ourprogram' className='w-full'>
        <div className='w-full flex flex-col'>
          <h1 className='text-4xl font-semibold text-center py-8 text-gray-700'><span className='text-brand-400'>Program</span> Kami</h1>
          <div className='flex flex-col md:flex-row w-full gap-6'>
            <div className='w-full outline-2 rounded-md outline-gray-300 flex flex-col items-center py-4 p-4 gap-y-4'>
              <div className='flex flex-row-reverse items-center font-semibold gap-x-4 text-xl text-brand-500'>
                E-Learning
                <div className='p-3 rounded-full bg-brand-100'>
                  <GoBook size={24} className='text-brand-500'/>
                  <div className='w-fit bg-brand-100 rounded-full'/>
                </div>
              </div>
              <div className='text-sm text-gray-500 text-justify'>
                Selamat datang di program E-Learning EduPact, tempat Anda dapat mengakses berbagai kursus berkualitas tinggi secara fleksibel dan mandiri. Nikmati materi pembelajaran interaktif, video tutorial menarik, dan modul komprehensif yang dirancang oleh para ahli di bidangnya. Belajar kapan saja, di mana saja, sesuai dengan ritme Anda sendiri untuk mengembangkan keterampilan baru atau memperdalam pengetahuan yang sudah ada. Bersama kami, transformasi pendidikan menjadi lebih mudah dijangkau dan efektif untuk masa depan Anda
              </div>
            </div>
            <div className='w-full outline-2 rounded-md outline-gray-300 flex flex-col items-center py-4 p-4 gap-y-4'>
              <div className='flex flex-row-reverse items-center font-semibold gap-x-4 text-xl text-brand-500'>
                Info Loker
              <div className='p-3 rounded-full bg-brand-100'>
                <GoPeople size={24} className='text-brand-500'/>
                <div className='w-fit bg-brand-100 rounded-full'/>
              </div>
              </div>
              <div className='text-sm text-gray-500 text-justify'>
                Kenali potensi dan kompetensi Anda secara lebih mendalam melalui program Analisis Skill dari EduPact. Kami menyediakan alat evaluasi yang akurat untuk membantu Anda mengidentifikasi kekuatan serta area yang perlu ditingkatkan. Dapatkan laporan hasil analisis yang detail, lengkap dengan rekomendasi jalur pembelajaran dan pengembangan karir yang dipersonalisasi. Manfaatkan wawasan ini untuk mengambil langkah strategis dalam perjalanan profesional dan pendidikan Anda ke tingkat selanjutnya.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
