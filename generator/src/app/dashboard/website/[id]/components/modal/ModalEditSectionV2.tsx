// todo : need rework because of new implementation
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import * as generateWebsiteNetwork from "@/network/generateWebsite/generateWebsite.network";
import useCurrentWebsite from "./../store/currentWebsite.zustand.store";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';
import { I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';
import FormGeneratorTemplate from './../Components/FormGeneratorTemplate';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import parseTemplateConfigStringToJSON from '../utils/parser';
import { template } from 'lodash';
import { A_I_TemplateVariant } from '@/network/configTemplate/configTemplate.entity';

function LoaderIconH() {
    return <LoaderIcon className="animate-spin" />
}

interface IModalEdit {
    open: boolean;
    setOpen: (val: boolean) => void;
    section: I_WebsiteSection;

}

const ModalEditSection = (props: IModalEdit) => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const currentWebsite = useCurrentWebsite();
    const [jsonData, setJsonData] = useState<any>({});
    const [template, setTemplate] = useState<A_I_TemplateVariant | undefined>(undefined);
    const templateGroup = useTemplateGroup();
   // const [selectedTemplate, setSelectedTemplate] = useState<entity.A_I_TemplateVariant | undefined>(undefined);


    const submitForm = () => {
        setIsLoading(true);
        /*
        generateWebsiteNetwork.updateWebsiteSection({
            title: data.title,
            description: data.description,
            sectionId: props.section.id,
            accessToken: session?.backendTokens?.accessToken ?? ""
        })
            .then(resp => {
                console.log("success edit section")
                console.log(resp);
                currentWebsite.updateSection(resp);
            })
            .catch(err => {
                console.log("err modalEditSection : ", err);
            })
            .finally(() => {
                setIsLoading(false);
                props.setOpen(false);
            })
            */
    }

    // rework later with json object property
    useEffect(() => {
       // setValue('title', props.section.title);
       // setValue('description', props.section.description);
    
       // 1) get current config template
        let templateG = templateGroup.templateVariant.find(e => props.section.configTemplateId === e.id);

        if (!templateG || !templateG.config) {
            console.log("template group");
            return ;
        }

        let templateGParse = parseTemplateConfigStringToJSON(templateG.config);
        console.log("template parse :")
        console.log(templateGParse);
        console.log("current section : ")
        console.log(props.section);

        // populate json
        let elementJSON : any = {};
        for (let x = 0; x < templateGParse.length; x++) {
            let curr = templateGParse[x];
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
            }
        }
       // build json data
       // templateG : give template
       setJsonData(elementJSON);
       setTemplate(templateG);
       console.log("element json");
       console.log(elementJSON);
        
    }, []);

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent>
                <DialogHeader >
                    <DialogTitle>
                        Edit your section
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-col gap-4 items-center">
                    {(props.open && template) ? <FormGeneratorTemplate
                            mode={"edit"}
                            selectedTemplate={template}
                            setSelectedTemplate={setTemplate}
                            order={props.section.websiteSectionOrder.order}
                            websiteId={props.section.websiteId}
                            setOpen={props.setOpen}
                            defaultData={jsonData}
                        /> : <LoaderIconH />
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog >
    )
}

export default ModalEditSection;