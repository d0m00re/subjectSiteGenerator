// todo : need rework because of new implementation
import React, { useState, useEffect } from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
  } from "@/components/ui/sheet"

import { I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import { I_TemplateVariant_parse } from '@/network/configTemplate/configTemplate.entity';
import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';
import EditSection from '@/components/WebsiteSection/EditSection/EditSection';

interface IModalEdit {
    open: boolean;
    setOpen: (val: boolean) => void;
    section: I_WebsiteSection;
}

interface IEncodeElemJson {
    templateVariant : I_TemplateVariant_parse[];
    section : I_WebsiteSection;
}

// encode elem json
const encodeElemJson = (props : IEncodeElemJson) => {
       // 1) get current config template
       let templateG = props.templateVariant.find(e => props.section.configTemplateId === e.id);

       if (!templateG || !templateG.config) {
           console.log("template group");
           return null;
       }

       let templateConfig = templateG.config;

       // populate json
       let elementJSON : any = {};
       for (let x = 0; x < templateConfig.length; x++) {
           let curr = templateConfig[x];
           if (curr.kind === "text") {
               let currElement = props.section.typographies.find(e => e.order === curr.order);
               if (currElement) {
                   elementJSON[curr.label] = currElement.text;
               }
           } else if (curr.kind === "button") {
               let currElement = props.section.buttons.find(e => e.order === curr.order);
               if (currElement) {
                   elementJSON[curr.label] = currElement.text;
               }
           } else if (curr.kind === "img") {
               let currElement = props.section.images.find(e => e.order === curr.order);
               if (currElement) {
                   elementJSON[curr.label] = currElement.url;
               }
           }
       }

      return {
        elementJSON,
        templateG
      }
}

const ModalEditSectionV2 = (props: IModalEdit) => {
    const [jsonData, setJsonData] = useState<any>({});
    const [template, setTemplate] = useState<I_TemplateVariant_parse | undefined>(undefined);
    const templateGroup = useTemplateGroup();

    // rework later with json object property
    useEffect(() => {
        let data = encodeElemJson({
            templateVariant : templateGroup.templateVariant,
            section : props.section
        });

       // build json data
       // templateG : give template
       if (data) {
        setJsonData(data.elementJSON);
        setTemplate(data.templateG);
       }
    }, []);

    return (
        <Sheet open={props.open} onOpenChange={props.setOpen}>
            <SheetContent>
                <SheetHeader >
                    <SheetTitle>
                        Edit your section
                    </SheetTitle>
                </SheetHeader>
                <SheetDescription className="flex flex-col gap-4 items-center">
                    {(props.open && template) ? <EditSection
                            selectedTemplate={template}
                            setSelectedTemplate={setTemplate}
                            order={props.section.websiteSectionOrder.order}
                            websiteId={props.section.websiteId}
                            setOpen={props.setOpen}
                            defaultData={jsonData}
                        /> : <IconLoaderSpin />
                    }
                </SheetDescription>
            </SheetContent>
        </Sheet >
    )
}

export default ModalEditSectionV2;