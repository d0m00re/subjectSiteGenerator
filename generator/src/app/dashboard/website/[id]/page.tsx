"use client"

//import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import SectionWebsite from './SectionWebsite';
import useCurrentWebsite from "./currentWebsite.zustand.store";
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import TemplateSkeleton from '@/components/Templates/TemplateSkeleton';

function page() {
  const { id } = useParams() // Assuming your file is named [id].js within the appropriate directory structure
  const [dataIsLoad, setDataIsLoad] =useState<boolean>(false);
  const currentWebsite = useCurrentWebsite();
  const templateGroup = useTemplateGroup();
  if (typeof (id) !== "string") return <></>

  useEffect(() => {
    setDataIsLoad(false);
    currentWebsite.populate(parseInt(id));
    templateGroup.populate();
    setDataIsLoad(true);
  }, []);

  return (
    <section className='flex flex-col m-8'>
      {(dataIsLoad) ?
        currentWebsite?.website?.websiteSection?.map((section, index) => <SectionWebsite
            key={`section-website-${section.id}`}
            section={section}
            index={index}  
          />): <TemplateSkeleton />
      }
    </section>
  )
}

export default page