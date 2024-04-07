import React, { useState, useEffect } from 'react';
import {
    Sheet,
    SheetContent,
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
import { ISectionLayout, IThemeSectionSpacing, I_WebsiteSection, makeEmptyThemeSectionSpacing } from '@/network/generateWebsite/generateWebsite.entity';
import StyleEditing from '../EditStyleSection/StyleEditing';
import EditSection from '../EditSection/EditSection';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import GlobalSectionStyle from '../GlobalSectionStyle/GlobalSectionStyle';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';
import { I_TemplateGen } from './modalEditContentAndStyle.d';
import { updateSectionV4 } from '@/network/website/website.network';
import { Button } from '@/components/ui/button';

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
    section: I_WebsiteSection;
}

function ModalEditContentAndStyle(props: Props) {
    const storeTemplate = useTemplateGroup();
    const storeWebsite = useCurrentWebsiteStore();
    const currentSection = storeWebsite.website?.websiteSection.find(e => e.id === props.section.id); //[props.sectionIndex];
    const currentTemplate = storeTemplate.templateVariant.find(e => e.id === currentSection?.configTemplateId);
    // dup section to edit
    const [dupSection, setDupSection] = useState<I_TemplateGen>();
    const [layout, setLayout] = useState<ISectionLayout>({ themePaletteOrder: -1, ThemeSectionSpacing : makeEmptyThemeSectionSpacing() });

    // add img here
    useEffect(() => {
        const _themeSectionSpacing = currentSection?.ThemeSectionSpacing;
        console.log((currentSection && _themeSectionSpacing) ? console.log("validddddd") : console.log("invalidddddddd"))
        if (currentSection && _themeSectionSpacing) {
            const allElemSection: I_TemplateGen = [
                ...currentSection.typographies.map(e => ({ ...e, kind: "typography" as const })),
                ...currentSection.buttons.map(e => ({ ...e, kind: "button" as const })),
                ...currentSection.images.map(e => ({ ...e, kind: "img" as const }))
            ]
                .sort((a, b) => a.order - b.order);
            setDupSection(allElemSection);

            // determine theme spacing to duplicuate or generate empty
            let themeSectionSpacing: IThemeSectionSpacing = (_themeSectionSpacing) ? {
                top: _themeSectionSpacing.top,
                bottom: _themeSectionSpacing.bottom,
                horizontalAlign: _themeSectionSpacing.horizontalAlign,
            } : makeEmptyThemeSectionSpacing()
            setLayout({
                themePaletteOrder: currentSection.themePaletteOrder,
                ThemeSectionSpacing: themeSectionSpacing
            });
        }
    }, []);

    const handleSubmit = () => {
        if (!dupSection || !currentSection) {
            console.error("dup section undefined")
            return;
        }
        updateSectionV4({
            data: dupSection,
            layout: layout,
            sectionId: currentSection.id,
        }).then(resp => {
            storeWebsite.updateSection(resp);
            props.setOpen(false)
        }).catch((err: any) => {
            props.setOpen(false);
        })
    }

    const currentTheme = storeWebsite.website?.themePalette.themePaletteElems.sort((a, b) => a.order - b.order); //[props.section.themePaletteOrder];

    if (!dupSection || !layout || !currentTemplate || !currentTheme) return <></>


    return (
        <Sheet open={props.open} onOpenChange={props.setOpen}>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit</SheetTitle>
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList>
                            <TabsTrigger value="content">Content</TabsTrigger>
                            <TabsTrigger value="globalStyle">Global style</TabsTrigger>
                            <TabsTrigger value="styleElem">Style</TabsTrigger>
                        </TabsList>
                        <TabsContent value="content">
                            <EditSection
                                selectedTemplate={currentTemplate}
                                websiteId={props.section.websiteId}
                                order={props.section.websiteSectionOrder.order}
                                setOpen={(val: boolean) => { }}
                                defaultData={undefined}
                                section={dupSection}
                                setSection={setDupSection}

                                currentTemplate={currentTemplate}
                            />
                        </TabsContent>
                        <TabsContent value="globalStyle">
                            <GlobalSectionStyle
                                sectionId={props.section.id}
                                onClose={() => props.setOpen(false)}
                                palette={currentTheme}
                                layout={layout}
                                setLayout={setLayout}
                            />
                        </TabsContent>
                        <TabsContent value="styleElem">
                            <StyleEditing
                                sectionId={props.section.id}
                                onClose={() => props.setOpen(false)}
                                dupSection={dupSection}
                                setDupSection={setDupSection}
                                currentTemplate={currentTemplate}
                            />
                        </TabsContent>
                    </Tabs>
                    <section className='flex flex-row gap-1'>
                        <Button className='flex gap-2' onClick={handleSubmit}>Save Section</Button>
                        <Button onClick={() => props.setOpen(false)}>Discard</Button>
                    </section>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default ModalEditContentAndStyle