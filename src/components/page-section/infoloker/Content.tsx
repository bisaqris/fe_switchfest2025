import React from 'react'
import Pagination from '@/components/tables/Pagination'
import Loker from '@/components/card/loker/Loker'

export default function Content() {
    return (
        <>
            <div className='w-full flex flex-col gap-4 items-end'>
                <Loker />
                <Loker />
                <Loker />
                <Loker />
                <Loker />
                <Pagination totalPages={100} currentPage={0} onPageChange="/"/>
            </div>
        </>
    )
}
