"use client"

import React, { useState, useEffect } from 'react'

import useTemplateGroup from '@/store/templateGroup.zustand.store';
import { useParams } from 'next/navigation';
import TemplateSkeleton from '@/components/Templates/TemplateSkeleton';
import RenderSectionWtConfig from '@/components/WebsiteSection/Render/RenderSectionWtConfig';
import SectionWebsite from '@/app/dashboard/website/[id]/components/SectionWebsite';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';
import MainLayout from '@/components/WebsiteSection/Render/MainLayout/MainLayout';


function page() {
    const { id } = useParams() // Assuming your file is named [id].js within the appropriate directory structure
    const storeWebsite = useCurrentWebsiteStore();
    const storeTemplate = useTemplateGroup();
    const [dataIsLoad, setDataIsLoad] = useState<boolean>(false);

    if (typeof (id) !== "string") return <></>

    useEffect(() => {
        setDataIsLoad(false);
        storeWebsite.populate(parseInt(id));
        storeTemplate.populate();
        setDataIsLoad(true);
    }, [])


    return (
        <MainLayout>
            <>
            {(dataIsLoad) ?
                storeWebsite?.website?.websiteSection?.map((section, index) =>
                    <section key={`section-${section.id}`} className={`flex flex-col p-4 gap-2 ${section.backgroundColor}`}>
                        <RenderSectionWtConfig
                            section={section}
                        />
                    </section>) : <TemplateSkeleton />
            }
            </>
        </MainLayout>
    )
}

export default page;