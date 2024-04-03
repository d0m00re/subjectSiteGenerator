"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

import useTemplateGroup from '@/store/templateGroup.zustand.store';
import TemplateSkeleton from '@/components/Templates/TemplateSkeleton';

import SectionWebsite from './components/SectionWebsite';
import useCurrentWebsite from "./components/store/currentWebsite.zustand.store";

import ModalCreateSection from './components/modal/ModalCreateSection';
import ButtonCreate from '@/components/atoms/ButtonCreate';
import MainLayout from '@/components/WebsiteSection/Render/MainLayout/MainLayout';
import useTemplatePalette from '@/store/templatePalette.zustand.store';
import { Button } from '@/components/Button';
import SheetTheme from '@/components/Theme/SheetTheme/SheetTheme';
import { map } from 'lodash';
import { ITemplateGroup, IThemePalette } from '@/network/theme/themePalette/templatePalette.entity';
import useThemeFont from '@/store/themeFont.zustand.store';

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
  const storeWebsite = useCurrentWebsite();
  const storeTemplate = useTemplateGroup();
  const storeThemeFont = useThemeFont();
  const [modalAddSection, setModalAddSection] = useState<IModalCreateSection>(resetModalCreateSection())
  const storeTemplatePalette = useTemplatePalette();

  if (typeof (id) !== "string") return <></>

  useEffect(() => {
    setDataIsLoad(false);
    storeWebsite.populate(parseInt(id));
    storeTemplate.populate();
    storeTemplatePalette.populate();
    storeThemeFont.populate();

    setDataIsLoad(true);
  }, []);

  /*
  let currentTheme : IThemePalette | undefined = undefined;  
  for (let i = 0; !currentTheme && i < storeTemplatePalette.templateGroups.length; i++) {
    currentTheme = storeTemplatePalette.templateGroups[i].themePalettes.find(e => e.id === storeWebsite.website?.themePaletteId); 
  }
  */
 let currentTheme = storeWebsite.website?.themePalette;
  
  if (!currentTheme) return <></>
  let realCurrentTheme = currentTheme;
  return (
    <>
      <SheetTheme />

      <MainLayout>
        <>
          <section className='flex flex-col m-8 items-center'>
            {/* basic case */}
            {(dataIsLoad) ?
              storeWebsite?.website?.websiteSection?.map((section, index) => <SectionWebsite
                key={`section-website-${section.id}`}
                section={section} 
                index={index}
                themePalette={realCurrentTheme}
              />) : <TemplateSkeleton />
            }
            {/* cas with no section */}
            {
              storeWebsite?.website?.websiteSection.length === 0 ?
                <ButtonCreate onClick={() => setModalAddSection({ open: true, index: 0 })} />
                :
                <></>
            }
          </section>
          <ModalCreateSection
            open={modalAddSection.open}
            order={modalAddSection.index}
            websiteId={storeWebsite.website?.id ?? -1}
            setOpen={(val: boolean) => {
              setModalAddSection(old => ({ ...old, open: val }))
            }
            }
          />
        </>
      </MainLayout>
    </>
  )
}

export default page;