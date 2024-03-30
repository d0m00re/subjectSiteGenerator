import React, { useEffect } from 'react';
import ChangeBackground from '@/components/WebsiteSection/Render/Layout/ChangeBackground/ChangeBackground';
import { ISectionLayout } from '@/network/generateWebsite/generateWebsite.entity';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';

type Props = {
    sectionId: number;
    onClose: () => void;

    layout : ISectionLayout;
    setLayout : React.Dispatch<React.SetStateAction<ISectionLayout>>;
}

function GlobalSectionStyle(props: Props) {
    const storeWebsite = useCurrentWebsiteStore();
    const currentSection = storeWebsite.website?.websiteSection.find(e => e.id === props.sectionId) //[props.sectionIndex];

    if (!currentSection)
    return <></>

    useEffect(() => {
        props.setLayout({
            backgroundColor: currentSection.backgroundColor,
            backgroundImage: currentSection.backgroundImage
        });
    }, []);

    const setBackgroundColor = (bgColor: string) => {
        props.setLayout(old => ({ ...old, backgroundColor: bgColor }));
    }

    return (
        <section className='flex flex-col gap-2 w-full'>
            <ChangeBackground
                backgroundColor={props.layout.backgroundColor}
                setBackgroundColor={setBackgroundColor}
            />
        </section>
    )
}

export default GlobalSectionStyle