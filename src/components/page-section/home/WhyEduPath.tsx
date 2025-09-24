import React from 'react'
import Image from 'next/image'
import Accordion from '@/components/common/Accordion'

export default function WhyEduPath() {
  return (
    <>
      <section id='#ourprogram' className='w-full'>
        <div className='w-full flex flex-col'>
          <h1 className='text-4xl font-semibold text-center py-8 text-gray-700'><span className='text-brand-400'>Kenapa Edupath</span> Berbeda?</h1>
          <div className='w-full flex flex-row  gap-x-8'>
            <div className=" w-full">
              <Accordion title="Kurikulum standar industri global">
                <p>
                  Kurikulum kami dirancang relevan dengan kebutuhan industri global terkini. Ini memastikan setiap lulusan memiliki kompetensi dan daya saing tinggi di pasar kerja internasional.
                </p>
              </Accordion>

              <Accordion title="Waktu belajar yang flexible">
                <p>
                  Nikmati kebebasan mengatur waktu belajar sesuai ritme dan kesibukan Anda. Materi dapat diakses secara online kapan saja, menjadikan pembelajaran lebih efektif dan personal.
                </p>
              </Accordion>

              <Accordion title="Setelah belajar dapat langsung apply ke industri">
                <p>
                  Keterampilan yang Anda peroleh dirancang untuk aplikasi praktis dan langsung di dunia industri. Kami menjembatani lulusan dengan berbagai peluang karir di perusahaan terdepan.
                </p>
              </Accordion>

              <Accordion title="Alumni terpercaya diberbagai perusahaan">
                <p>
                  Alumni Edupath telah membuktikan kualitasnya dan dipercaya oleh berbagai perusahaan. Kesuksesan mereka di industri menjadi bukti nyata kualitas pendidikan yang kami berikan.
                </p>
              </Accordion>
            </div>
            <div className='w-full flex flex-col gap-y-4'>
              <div className='flex gap-x-4'>
                <Image src="/images/wed/1-1.png" alt=' ' height={184} width={288} className='w-full' />
                <Image src="/images/wed/1-2.png" alt=' ' height={184} width={288} className='w-full' />
              </div>
              <div>
                <Image src="/images/wed/2-1.png" alt=' ' height={184} width={588} className='w-full'/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
