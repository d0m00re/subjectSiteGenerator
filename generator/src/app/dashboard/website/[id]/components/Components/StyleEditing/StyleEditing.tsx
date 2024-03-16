import React from 'react'
import useCurrentWebsiteStore from '../../store/currentWebsite.zustand.store'
import { I_TemplateElemTypography } from '@/network/website/websiteSection/templateElemTypography/templateElemTypography.entity';
import { I_TemplateElemButton } from '@/network/website/websiteSection/templateElemButton/templateElemButton.entity';

type Props = {
    sectionIndex : number;
}

// aya maybe make a better type later
// we don t use config here maybe for that maybe later we will ...
interface I_TemplateElemTypography_kind extends I_TemplateElemTypography {kind : "typography"}
interface I_TemplateElemButton_kind extends I_TemplateElemButton {kind : "button"}
type I_TemplateGen = (I_TemplateElemTypography_kind | I_TemplateElemButton_kind)[];

function StyleEditing(props: Props) {
    const currentWebsite = useCurrentWebsiteStore();
    const currentSection = currentWebsite.website?.websiteSection[props.sectionIndex];

    if (!currentSection)
        return <></>

    const allElemSection : I_TemplateGen = [
        ...currentSection.typographies.map(e => ({...e, kind : "typography" as const})),
        ...currentSection.buttons.map(e => ({...e, kind : "button" as const}))]
        .sort((a, b) => a.order - b.order);

    return (
        <section>
            <h1>{currentSection?.kind} | {currentSection?.configTemplateId}</h1>
            {
                allElemSection.map(elem => {
                    if (elem.kind === "typography")
                        return <p>typography : {elem.text}</p>
                    else if (elem.kind === "button") 
                        return <p>button : {elem.text}</p>
                    return <></>
                })
            }
        </section>
  )
}

export default StyleEditing