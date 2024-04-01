"use client"

import React, { useState, useEffect } from 'react'

import useTemplateGroup from '@/store/templateGroup.zustand.store';
import { useParams } from 'next/navigation';
import TemplateSkeleton from '@/components/Templates/TemplateSkeleton';
import RenderSectionWtConfig from '@/components/WebsiteSection/Render/RenderSectionWtConfig';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';
import MainLayout from '@/components/WebsiteSection/Render/MainLayout/MainLayout';
import useTemplatePalette from '@/store/templatePalette.zustand.store';


function page() {
    const { id } = useParams() // Assuming your file is named [id].js within the appropriate directory structure
    const storeWebsite = useCurrentWebsiteStore();
    const storeTemplate = useTemplateGroup();
    const storeTemplatePalette = useTemplatePalette();
    const [dataIsLoad, setDataIsLoad] = useState<boolean>(false);

    if (typeof (id) !== "string") return <></>

    useEffect(() => {
        setDataIsLoad(false);
        storeWebsite.populate(parseInt(id));
        storeTemplate.populate();
        storeTemplatePalette.populate();
        setDataIsLoad(true);
    }, []);

    let currentTheme = storeWebsite.website?.themePalette;
    if (!currentTheme) return <></>
    let realCurrentTheme = currentTheme;

    return (
        <MainLayout>
            <>
                {(dataIsLoad) ?
                    storeWebsite?.website?.websiteSection?.map((section, index) =>
                        <section key={`section-${section.id}`} className={`flex flex-col`}>
                            <RenderSectionWtConfig
                                section={section}
                                themePalette={realCurrentTheme.themePaletteElems[section.themePaletteOrder]}
                            />
                        </section>) : <TemplateSkeleton />
                }
            </>
        </MainLayout>
    )
}

export default page;