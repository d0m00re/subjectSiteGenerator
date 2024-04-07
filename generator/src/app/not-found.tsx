import { Octagon } from 'lucide-react';
import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <section className='flex g-2 w-full h-full justify-center items-center'>
      <Octagon color="red" />
      <h1 className='text-2xl p-5'>page not found</h1>
    </section>
  )
}

export default page;