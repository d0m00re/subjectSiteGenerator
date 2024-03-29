import React, { useState } from 'react';
//import useCurrentWebsite from "./../currentWebsite.zustand.store";
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import * as entity from "@/network/configTemplate/configTemplate.entity";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

//import { useSession } from 'next-auth/react';
//import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';
import { SelectTemplateAccordion, FormGeneratorTemplate } from './../Components';

interface IModalCreateSection {
    open: boolean;
    order: number;
    websiteId: number;
    setOpen: (val: boolean) => void;
}

const ModalCreateSection = (props: IModalCreateSection) => {
    //const currentWebsite = useCurrentWebsite();
    const templateGroup = useTemplateGroup();
    const [selectedTemplate, setSelectedTemplate] = useState<entity.A_I_TemplateVariant | undefined>(undefined);

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent>
                <DialogHeader >
                    <DialogTitle>
                        Create a new section
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-col gap-4 items-center">

                    {selectedTemplate === undefined ?
                        <SelectTemplateAccordion
                            groupTemplates={templateGroup.templateGroup}
                            selectedTemplate={selectedTemplate}
                            setSelectedTemplate={setSelectedTemplate}
                        /> :
                        <FormGeneratorTemplate
                            mode="create"
                            selectedTemplate={selectedTemplate}
                            setSelectedTemplate={setSelectedTemplate}
                            order={props.order}
                            websiteId={props.websiteId}
                            setOpen={props.setOpen}
                        />
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog >
    )
}

export default ModalCreateSection;