"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

import useTemplateGroup from '@/store/templateGroup.zustand.store';
import TemplateSkeleton from '@/components/Templates/TemplateSkeleton';
import { Button } from '@/components/Button';

import SectionWebsite from './components/SectionWebsite';
import useCurrentWebsite from "./components/currentWebsite.zustand.store";

import ModalCreateSection from './components/ModalCreateSection';

//----- duplicate

interface IModalCreateSection {
  index: number;
  open: boolean;
}

const resetModalCreateSection = (): IModalCreateSection => ({
  index: -1,
  open: false
});

//--------------------

function page() {
  const { id } = useParams() // Assuming your file is named [id].js within the appropriate directory structure
  const [dataIsLoad, setDataIsLoad] = useState<boolean>(false);
  const currentWebsite = useCurrentWebsite();
  const templateGroup = useTemplateGroup();
  const [modalAddSection, setModalAddSection] = useState<IModalCreateSection>(resetModalCreateSection())

  if (typeof (id) !== "string") return <></>

  useEffect(() => {
    setDataIsLoad(false);
    currentWebsite.populate(parseInt(id));
    templateGroup.populate();
    setDataIsLoad(true);
  }, []);

  return (
    <>
      <section className='flex flex-col m-8'>
        {/* basic case */}
        {(dataIsLoad) ?
          currentWebsite?.website?.websiteSection?.map((section, index) => <SectionWebsite
            key={`section-website-${section.id}`}
            section={section}
            index={index}
          />) : <TemplateSkeleton />
        }
        {/* cas with no section */}
        {
          currentWebsite?.website?.websiteSection.length === 0 ?
            <Button onClick={() => setModalAddSection({open : true, index : 0})}>
              create
            </Button>
            :
            <></>
        }
      </section>
      <ModalCreateSection
        open={modalAddSection.open}
        order={modalAddSection.index}
        websiteId={currentWebsite.website?.id ?? -1}
        setOpen={(val: boolean) => {
          //alert("onclick modal add section")
          //if (modalEdit === false || val === false)
            setModalAddSection(old => ({ ...old, open: val }))
        }
        }
      />
    </>
  )
}

export default page;