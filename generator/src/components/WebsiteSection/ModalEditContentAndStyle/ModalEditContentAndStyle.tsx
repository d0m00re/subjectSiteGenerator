import React from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';
import StyleEditing from '../EditStyleSection/StyleEditing';
import EditSection from '../EditSection/EditSection';
import useTemplateGroup from '@/store/templateGroup.zustand.store';

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
    section: I_WebsiteSection;
}

function ModalEditContentAndStyle(props: Props) {
    const templateGroup = useTemplateGroup();

    const selectedTemplate = templateGroup.templateVariant.find(e => e.id === props.section.configTemplateId)

    return (
        <Sheet open={props.open} onOpenChange={props.setOpen}>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit</SheetTitle>
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList>
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="styleElem">Style</TabsTrigger>
                        </TabsList>
                        <TabsContent value="content">
                            <EditSection
                                selectedTemplate={selectedTemplate}
                                websiteId={props.section.websiteId}
                                order={props.section.websiteSectionOrder.order}
                                setOpen={(val: boolean) => {}}
                                defaultData={undefined}
                            />
                        </TabsContent>
                        <TabsContent value="styleElem">
                                <StyleEditing
                                    sectionId={props.section.id}
                                    onClose={() => props.setOpen(false)}
                                />
                        </TabsContent>
                    </Tabs>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default ModalEditContentAndStyle