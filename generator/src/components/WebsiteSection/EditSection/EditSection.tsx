/*
** components use for create or update a section (mode)
*/
import React, { useState, useEffect } from 'react'
import * as entity from "@/network/configTemplate/configTemplate.entity";
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import * as entityWebsite from '@/network/website/website.entity';
import { updateSectionV4 } from '@/network/website/website.network';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import { cloneDeep } from 'lodash';
import { ModalMediaSelector } from '@/components/Library';
import Image from 'next/image';
import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';
import { Textarea } from '@/components/ui/textarea';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';

interface IFormGeneratorTemplate {
    selectedTemplate: entity.ParsedTemplateVariant | undefined
    setSelectedTemplate: React.Dispatch<React.SetStateAction<entity.ParsedTemplateVariant | undefined>>
    websiteId: number;
    order: number;
    setOpen: (val: boolean) => void;
    defaultData?: any; // default json data
}

function EditSection(props: IFormGeneratorTemplate) {
    // config
    const [onLoad, setOnLoad] = useState(false);
    const templateConfig = props.selectedTemplate?.config;
    const [dataFormV4, setDataFormV4] = useState<entityWebsite.TUpdateDataV4[]>([]);
    const storeWebsite = useCurrentWebsiteStore();
    const storeTemplate = useTemplateGroup();

    useEffect(() => {
        console.log("Edit section")
        const dataUpdateSection: entityWebsite.TUpdateDataV4[] = [];

        let currSection = storeWebsite.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

        if (!currSection) {
            console.log("section not found")
            return;
        }

        // get back template
        let currTemplate = storeTemplate.templateVariant.find(e => e.id === currSection?.configTemplateId);

        if (!currTemplate) {
            console.log("template not found")
            return;
        }

        let config = currTemplate.config; //entity.parseTemplateConfigStringToJSON(currTemplate.config);

        for (let i = 0; i < config.length; i++) {
            let currTemplate = config[i];

            if (currTemplate.kind === "text") {
                let elemTypo = currSection.typographies.find(e => e.order === currTemplate.order);
                if (elemTypo) {
                    dataUpdateSection.push({
                        kind: "typography",
                        ...elemTypo
                    })
                }
            } else if (currTemplate.kind === "button") {
                let elemButton = currSection.buttons.find(e => e.order === currTemplate.order);
                if (elemButton) {
                    dataUpdateSection.push({
                        kind: "button",
                        ...elemButton
                    });
                }
            } else if (currTemplate.kind === "img") {
                let elemImg = currSection.images.find(e => e.order === currTemplate.order);
                if (elemImg) {
                    dataUpdateSection.push({
                        kind: "img",
                        ...elemImg
                    })
                }
            }
        }
        setDataFormV4(dataUpdateSection);

    }, [])

    const submitFormEdit = () => {
        // find section with order
        let currentSection = storeWebsite.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

        if (!currentSection) {
            console.error("website section not found with order : ", props.order);
            return;
        }

        setOnLoad(true);

        updateSectionV4({
            data: dataFormV4,//dataFormV2,
            layout: { backgroundColor: currentSection.backgroundColor, backgroundImage: currentSection.backgroundImage },
            sectionId: currentSection.id,
        })
            .then((resp: any) => {
                // websiteStore.resetWtData(resp);
                storeWebsite.updateSection(resp);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                props.setOpen(false);
                setOnLoad(false);
            })
    }

    const submitForm = (e: any) => {
        e.preventDefault();
        submitFormEdit();
    }

    const handleChange = (event: any, index: number) => {

        let dataDup = cloneDeep(dataFormV4);
        let elem = dataDup[index];
        if (elem.kind === "typography" || elem.kind === "button") {
            const { name, value } = event.target;
            elem.text = value;
            dataDup[index] = elem;//{ ...dataDup[index], text: value };
        }
        else if (elem.kind === "img") {
            elem.url = event;
        }
        setDataFormV4(dataDup);
    }

    if (!templateConfig)
        return <></>

    return (
        <section className='flex flex-col gap-2'>
            <form
                className='flex flex-col gap-2'>
                {
                    templateConfig?.map((templateElem, index) => {
                        let currElem = dataFormV4[index];
                        if (dataFormV4.length !== templateConfig.length) {
                            return <></>
                        }
                        // switch (currElem.kind) {
                        if (currElem.kind === "typography" && templateElem.kind === "text") {
                            return <section
                                key={`formgeneratortemplate-typo-${templateElem.label}`}
                                className='flex flex-col gap-1'>
                                <p>{templateElem.label}</p>
                                {templateElem.formVariant === "line" ?
                                    <Input
                                        name={templateElem.label}
                                        onChange={(e) => handleChange(e, index)}
                                        type="text"
                                        value={(currElem) ? (currElem.text) : ""}
                                    /> :
                                    <Textarea
                                        name={templateElem.label}
                                        onChange={(e) => handleChange(e, index)}
                                        value={(currElem) ? (currElem.text) : ""}
                                    />
                                }
                            </section>
                        }
                        else if (currElem.kind === "button" && templateElem.kind === "button") {
                            return <section
                                key={`formgeneratortemplate-button-${templateElem.label}`}
                                className='flex flex-col gap-1'>
                                <p>{templateElem.label}</p>
                                <Input
                                    name={templateElem.label}
                                    onChange={(e) => handleChange(e, index)}
                                    type="text"
                                    value={(currElem) ? (currElem.text) : ""}
                                />
                            </section>
                        }
                        else if (currElem.kind === "img" && templateElem.kind === "img") {
                            return <section
                                key={`formgeneratortemplate-img-${templateElem.label}`}
                                className='flex flex-col gap-1 justify-center items-center'>
                                <p>{templateElem.label}</p>
                                {
                                    (currElem.url && currElem.url.length) ?
                                        <Image
                                            className='object-contain h-[150px] w-[150px]'
                                            src={currElem.url}
                                            width={500}
                                            height={500}
                                            alt="elem"
                                        />
                                        :
                                        <></>
                                }
                                <ModalMediaSelector
                                    url={currElem.url}
                                    setUrl={(s: string) => {
                                        handleChange(s, index);
                                    }}
                                />
                            </section>
                        }
                    })}

                <Button onClick={submitForm} className='mt-4'>{
                    (onLoad) ? <IconLoaderSpin /> : <>Save</>
                }</Button>
            </form>
        </section>
    )
}

export default EditSection;