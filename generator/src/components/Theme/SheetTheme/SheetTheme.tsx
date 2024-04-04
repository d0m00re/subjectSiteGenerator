import React, { useState, useEffect } from 'react';
import ConfigButton from './ConfigButton/ConfigButton';
import ConfigPalette from './ConfigPalette/ConfigPalette';
import ConfigFont from './ConfigFont/ConfigFont';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/Button';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';
import { ITmpTheme, makeEmptyTmpTheme } from './SheetTheme.entity';
import { updateTheme } from '@/network/website/website.network';
import ButtonLoader from '@/components/atoms/ButtonLoader';
import { cloneDeep } from 'lodash';
import { IThemeButton } from '@/network/website/website.entity';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save } from 'lucide-react';

function SheetTheme() {
    const [open, setOpen] = useState(true) //useState(false)
    const storeWebsite = useCurrentWebsiteStore();
    const [theme, setTheme] = useState<ITmpTheme>(makeEmptyTmpTheme());
    const [onLoad, setOnload] = useState<boolean>(false);

    const setThemePaletteId = (id: number) => setTheme(old => ({ ...old, themePaletteId: id }));
    const setThemeFontId = (id: number) => setTheme(old => ({ ...old, themeFontId: id }));
    const setThemeButton = (themeButton: IThemeButton) => setTheme(old => ({ ...old, themeButton: themeButton }))
    useEffect(() => {
        setTheme({
            themePaletteId: storeWebsite.website?.themePaletteId ?? -1,
            themeFontId: storeWebsite.website?.themeFontId ?? -1,
            themeButton: cloneDeep(storeWebsite.website?.ThemeButton) ?? undefined
        })
    }, [storeWebsite])

    useEffect(() => {
        console.log("theme update =========")
        console.log(theme)
    }, [theme]);

    const onSave = async () => {
        if (storeWebsite.website?.id === undefined) return;
        setOnload(true);
        let data = await updateTheme({
            websiteId: storeWebsite.website.id,
            themePaletteId: theme.themePaletteId,
            themeFontId: theme.themeFontId,
            themeButton: theme.themeButton
        });

        // update store
        storeWebsite.partialUpdate(data);

        // close modal
        setOpen(false);
        setOnload(false);
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>Theme manager</SheetTrigger>
            <SheetContent className='h-full flex flex-col'>
                <Tabs defaultValue="configButton" className="w-full h-full max-h-full">
                    <section className='flex flex-row w-full justify-between pr-5 pl-5'>

                        <TabsList className='flex flex-row '>
                            <TabsTrigger value="configButton">button</TabsTrigger>
                            <TabsTrigger value="configPalette">palette</TabsTrigger>
                            <TabsTrigger value="configPolicies" className='mr-2'>font</TabsTrigger>
                        </TabsList>
                        <ButtonLoader onLoad={onLoad} onClick={onSave}>
                            <Save />
                        </ButtonLoader>
                    </section>

                    <section className='max-h-full h-full overflow-y-auto pb-6 pt-6 pr-2'>
                        <TabsContent value="configButton">
                            <ConfigButton
                                buttonConfig={theme?.themeButton}
                                setThemeButton={setThemeButton}
                            />
                        </TabsContent>
                        <TabsContent value="configPalette" >
                            <ConfigPalette
                                themePaletteId={theme.themePaletteId}
                                setThemePaletteId={setThemePaletteId}
                            />
                        </TabsContent>
                        <TabsContent value="configPolicies">
                            <ConfigFont
                                currentFontId={theme.themeFontId ?? -1}
                                themeFontId={theme.themePaletteId ?? -1}
                                setThemeFontId={setThemeFontId}
                            />
                        </TabsContent>
                    </section>
                </Tabs>
            </SheetContent>
        </Sheet>
    )
}

export default SheetTheme