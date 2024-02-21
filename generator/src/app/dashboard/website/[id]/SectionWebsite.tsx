import { ISection } from '@/network/generateWebsite.network'
import React from 'react'

type Props = {}

function SectionWebsite(props: ISection) {
  return (
    <section className='flex flex-col gap-2'>
          <h2 className='text-xl'>{props.title}</h2>
          <p>{props.description}</p>
        </section>
  )
}

export default SectionWebsite