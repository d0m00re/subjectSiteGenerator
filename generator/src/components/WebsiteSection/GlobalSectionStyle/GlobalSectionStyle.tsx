import React from 'react';
import ChangeBackground from '@/components/WebsiteSection/Render/Layout/ChangeBackground/ChangeBackground';

import { ISectionLayout, IThemeSectionSpacing, makeEmptyThemeSectionSpacing } from '@/network/generateWebsite/generateWebsite.entity';

import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';
import { IThemePaletteElem } from '@/network/theme/themePalette/templatePalette.entity';
import { Separator } from '@/components/ui/separator';
import ChangeSpacing from '../Render/Layout/ChangeSpacing/ChangeSpacing';
 
type IGlobalSectionStyle = {
    sectionId: number;
    onClose: () => void;

    layout: ISectionLayout;
    setLayout: React.Dispatch<React.SetStateAction<ISectionLayout>>;

    palette : IThemePaletteElem[];
}

function GlobalSectionStyle(props: IGlobalSectionStyle) {
    const storeWebsite = useCurrentWebsiteStore();
    const currentSection = storeWebsite.website?.websiteSection.find(e => e.id === props.sectionId) //[props.sectionIndex];

    if (!currentSection)
        return <></>;

    const setPaletteOrder = (orderIndex : number) => {
        props.setLayout(old => ({ ...old, themePaletteOrder : orderIndex}))
    }

    const setThemeSectionSpacing = (data : Partial<IThemeSectionSpacing>) => {
        props.setLayout(old => ({
            ...old,
            ThemeSectionSpacing : {
                ...old.ThemeSectionSpacing,
                ...data
            }
        }))
    }

    return ( 
        <section className='flex flex-col gap-2 w-full'>
            <ChangeBackground
                setPaletteOrder={setPaletteOrder}
                palette={props.palette}
                themePaletteOrder={props.layout.themePaletteOrder}
            />

            <Separator />

            {props.layout.ThemeSectionSpacing ?
            <ChangeSpacing
                themeSpacing={props.layout.ThemeSectionSpacing}
                setThemeSpacing={setThemeSectionSpacing}
            /> : <></>}

        </section>
    )
}

export default GlobalSectionStyle
