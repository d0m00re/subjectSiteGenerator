import React, { useEffect } from 'react';
import ChangeBackground from '@/components/WebsiteSection/Render/Layout/ChangeBackground/ChangeBackground';

import { ISectionLayout } from '@/network/generateWebsite/generateWebsite.entity';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';
import { IThemePaletteElem } from '@/network/theme/themePalette/templatePalette.entity';

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

    useEffect(() => {
        props.setLayout({
            themePaletteOrder: currentSection.themePaletteOrder
        });
    }, []);

    const setPaletteOrder = (orderIndex : number) => {
        props.setLayout(old => ({ ...old, themePaletteOrder : orderIndex}))
    }

    return ( 
        <section className='flex flex-col gap-2 w-full'>
            <ChangeBackground
                setPaletteOrder={setPaletteOrder}
                palette={props.palette}
                themePaletteOrder={props.layout.themePaletteOrder}
            />

            <ChangeSpacing />

        </section>
    )
}

//

type IChangeSpacing = {}

function ChangeSpacing(props: IChangeSpacing) {
  return (
    <div>GlobalSectionStyle</div>
  )
}

export default GlobalSectionStyle
