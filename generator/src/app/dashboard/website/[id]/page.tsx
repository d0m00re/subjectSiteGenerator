"use client"

//import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import SectionWebsite from './SectionWebsite';
import useCurrentWebsite from "./currentWebsite.zustand.store";

function page() {
  const { id } = useParams() // Assuming your file is named [id].js within the appropriate directory structure
  console.log(id);
  const currentWebsite = useCurrentWebsite();

  if (typeof (id) !== "string") return <></>

  useEffect(() => {
    currentWebsite.populate(parseInt(id));
  }, []);

  return (
    <section className='flex flex-col m-8'>
      {
        currentWebsite?.website?.websiteSection?.map((section, index) => <SectionWebsite
            key={`section-website-${section.id}`}
            section={section}
            index={index}  
          />)
      }
    </section>
  )
}

export default page