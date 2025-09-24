import React from 'react'
import CourseV2 from '@/components/card/course/CourseV2'


export default function CourseList() {
  return (
    <>
      <div className='w-full flex  gap-6 justify-center'>
        <CourseV2 />
        <CourseV2 />
        <CourseV2 />
        <CourseV2 />
      </div>
    </>
  )
}
