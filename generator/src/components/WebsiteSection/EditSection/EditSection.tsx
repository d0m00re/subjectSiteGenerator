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
import { I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';
import { I_TemplateVariant_parse } from '@/network/configTemplate/configTemplate.entity';
import { I_TemplateGen } from '../ModalEditContentAndStyle/modalEditContentAndStyle';

interface IFormGeneratorTemplate {
    selectedTemplate: entity.ParsedTemplateVariant | undefined
    websiteId: number;
    order: number;
    setOpen: (val: boolean) => void;
    defaultData?: any; // default json data

    section : I_TemplateGen ;
    setSection : React.Dispatch<React.SetStateAction<I_TemplateGen | undefined>>,
    currentTemplate : I_TemplateVariant_parse;
}

function EditSection(props: IFormGeneratorTemplate) {
    const handleChange = (event: any, index: number) => {

        let dataDup = cloneDeep(props.section);
        let elem = dataDup[index];
        if (elem.kind === "typography" || elem.kind === "button") {
            const { name, value } = event.target;
            elem.text = value;
            dataDup[index] = elem;//{ ...dataDup[index], text: value };
        }
        else if (elem.kind === "img") {
            elem.url = event;
        }
        props.setSection(dataDup);
    }

    if (!props.currentTemplate)
        return <></>

    return (
        <section className='flex flex-col gap-2'>
            <form
                className='flex flex-col gap-2'>
                {
                    props.currentTemplate.config?.map((templateElem, index) => {
                        let currElem = props.section.find(e => e.order === templateElem.order);

                        if (currElem?.kind === "typography" && templateElem.kind === "text") {
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
                        else if (currElem?.kind === "button" && templateElem.kind === "button") {
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
                        else if (currElem?.kind === "img" && templateElem.kind === "img") {
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
            </form>
        </section>
    )
}

export default EditSection;