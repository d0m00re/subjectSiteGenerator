import React, { useState, useEffect } from 'react'
import { I_TemplateElemTypography } from '@/network/website/websiteSection/templateElemTypography/templateElemTypography.entity';
import { I_TemplateElemButton } from '@/network/website/websiteSection/templateElemButton/templateElemButton.entity';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import { Button } from '@/components/Button';
import cloneDeep from 'lodash/cloneDeep';
import { updateSectionV4 } from '@/network/website/website.network';
import ChangeBackground from '@/components/WebsiteSection/Render/Layout/ChangeBackground/ChangeBackground';
import { ISectionLayout } from '@/network/generateWebsite/generateWebsite.entity';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';
import CustomSelect from '@/components/atoms/Select/CustomSelect/CustomSelect';
import { selectSizeArray } from '@/components/atoms/Select/CustomSelect/options';
import { TSizeEnum } from '@/components/atoms/Select/CustomSelect/CustomSelect.d';

type IStyleEditing = {
    sectionIndex: number;
    onClose: () => void;
}

// aya maybe make a better type later
// we don t use config here maybe for that maybe later we will ...
interface I_TemplateElemTypography_kind extends I_TemplateElemTypography { kind: "typography" }
interface I_TemplateElemButton_kind extends I_TemplateElemButton { kind: "button" }
type I_TemplateGen = (I_TemplateElemTypography_kind | I_TemplateElemButton_kind)[];

function StyleEditing(props: IStyleEditing) {
    const storeWebsite = useCurrentWebsiteStore();
    const storeTemplate = useTemplateGroup();
    const currentSection = storeWebsite.website?.websiteSection[props.sectionIndex];
    const currentTemplate = storeTemplate.templateVariant.find(e => e.id === currentSection?.configTemplateId);
    // use for storing a list of typography section and button section
    const [dupSection, setDupSection] = useState<I_TemplateGen>([]);
    // use for global layout of section
    const [layout, setLayout] = useState<ISectionLayout>({ backgroundColor: "", backgroundImage: "" });

    if (!currentSection || !currentTemplate)
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

    const setBackgroundColor = (bgColor: string) => {
        setLayout(old => ({ ...old, backgroundColor: bgColor }));
    }

    return (
        <section className='flex flex-col gap-2 w-full'>
            <h1>{currentSection?.kind} | {currentSection?.configTemplateId}</h1>
            <p>layout style</p>
            <ChangeBackground
                backgroundColor={layout.backgroundColor}
                setBackgroundColor={setBackgroundColor}
            />
            <p>section style</p>
            {
                currentTemplate.config.map((templateElem, index) => {
                    let findElem = dupSection.find(e => e.order === templateElem.order);
                    if (templateElem.kind === "text" && findElem?.kind === "typography") {
                        return <section className='flex flex-col gap-2'>
                            <p>typography : {templateElem.label}</p>
                            <CustomSelect
                                options={selectSizeArray}
                                label={"size"}
                                value={findElem.size}
                                onChange={(size: string) => {
                                    let tmp = cloneDeep(dupSection);
                                    tmp[index].size = size as TSizeEnum;
                                    setDupSection(tmp);
                                }}
                            />
                        </section>
                    }
                    else if (templateElem.kind === "button" && findElem?.kind === "button") {
                        return <section className='flex flex-col gap-2'>
                            <p>button : {templateElem.label}</p>
                            <CustomSelect
                                options={selectSizeArray}
                                label="size"
                                value={findElem.size}
                                onChange={(size: string) => {
                                    let tmp = cloneDeep(dupSection);
                                    tmp[index].size = size as TSizeEnum;
                                    setDupSection(tmp);
                                }}
                            />
                        </section>
                    }
                    return <></>
                })
            }
            <div>
                <Button onClick={props.onClose}>Discard</Button>
                <Button onClick={() => {
                    handleSubmit();
                }
                }>Save</Button>
            </div>
        </section>
    )
}

export default StyleEditing;