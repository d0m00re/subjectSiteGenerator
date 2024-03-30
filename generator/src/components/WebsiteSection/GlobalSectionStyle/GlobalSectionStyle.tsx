import React, { useState, useEffect } from 'react';
import ChangeBackground from '@/components/WebsiteSection/Render/Layout/ChangeBackground/ChangeBackground';
import { ISectionLayout } from '@/network/generateWebsite/generateWebsite.entity';
import { Button } from '@/components/Button';
import { updateSectionV4 } from '@/network/website/website.network';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';
import { I_TemplateElemTypography } from '@/network/website/websiteSection/templateElemTypography/templateElemTypography.entity';
import { I_TemplateElemButton } from '@/network/website/websiteSection/templateElemButton/templateElemButton.entity';

type Props = {
    sectionId: number;
    onClose: () => void;
}

interface I_TemplateElemTypography_kind extends I_TemplateElemTypography { kind: "typography" }
interface I_TemplateElemButton_kind extends I_TemplateElemButton { kind: "button" }
type I_TemplateGen = (I_TemplateElemTypography_kind | I_TemplateElemButton_kind)[];


function GlobalSectionStyle(props: Props) {
    const storeWebsite = useCurrentWebsiteStore();
    const [layout, setLayout] = useState<ISectionLayout>({ backgroundColor: "", backgroundImage: "" });
    const [dupSection, setDupSection] = useState<I_TemplateGen>([]);
    const currentSection = storeWebsite.website?.websiteSection.find(e => e.id === props.sectionId) //[props.sectionIndex];

    if (!currentSection)
    return <></>

    useEffect(() => {

        const allElemSection: I_TemplateGen = [
            ...currentSection.typographies.map(e => ({ ...e, kind: "typography" as const })),
            ...currentSection.buttons.map(e => ({ ...e, kind: "button" as const }))]
            .sort((a, b) => a.order - b.order);

        setDupSection(allElemSection);
        setLayout({
            backgroundColor: currentSection.backgroundColor,
            backgroundImage: currentSection.backgroundImage
        });
    }, []);

    const setBackgroundColor = (bgColor: string) => {
        setLayout(old => ({ ...old, backgroundColor: bgColor }));
    }

    const handleSubmit = () => {
        updateSectionV4({
            data: dupSection,
            layout: layout,
            sectionId: currentSection.id,
        }).then(resp => {
            storeWebsite.updateSection(resp);
            props.onClose();
        }).catch((err: any) => {
            props.onClose();
        })
    }

    return (
        <section className='flex flex-col gap-2 w-full'>

            <ChangeBackground
                backgroundColor={layout.backgroundColor}
                setBackgroundColor={setBackgroundColor}
            />

            <div className='flex flex-row gap-2'>
                <Button onClick={props.onClose}>Discard</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </div>
        </section>
    )
}

export default GlobalSectionStyle