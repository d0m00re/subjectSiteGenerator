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

function SheetTheme() {
    const [open, setOpen] = useState(false)
    const storeWebsite = useCurrentWebsiteStore();
    const [theme, setTheme] = useState<ITmpTheme>(makeEmptyTmpTheme());
    const [onLoad, setOnload] = useState<boolean>(false);

    const setThemePaletteId = (id : number) => setTheme(old => ({...old, themePaletteId : id}));
    const setThemeFontId = (id : number) => setTheme(old => ({...old, themeFontId : id}));
    const setThemeButton = (themeButton : IThemeButton) => setTheme(old => ({...old, themeButton : themeButton}))
    useEffect(() => {
        setTheme({
            themePaletteId : storeWebsite.website?.themePaletteId ?? -1,
            themeFontId : storeWebsite.website?.themeFontId ?? -1,
            themeButton : cloneDeep(storeWebsite.website?.ThemeButton) ?? undefined
        })
    }, [storeWebsite])

    useEffect(() => {
        console.log("theme update =========")
        console.log(theme)
    }, [theme]);

    const onSave = async () => {
        if (storeWebsite.website?.id === undefined) return ;
        setOnload(true);
        let data = await updateTheme({
            websiteId : storeWebsite.website.id,
            themePaletteId : theme.themePaletteId,
            themeFontId : theme.themeFontId,
            themeButton : theme.themeButton
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
            <SheetContent>
                <Tabs defaultValue="configPalette" className="w-full">    
                    <TabsList>
                        <TabsTrigger value="configButton">button</TabsTrigger>
                        <TabsTrigger value="configPalette">palette</TabsTrigger>
                        <TabsTrigger value="configPolicies">font</TabsTrigger>
                    </TabsList>
                    <TabsContent value="configButton">
                        <ConfigButton
                            buttonConfig={theme?.themeButton}
                            setThemeButton={setThemeButton}
                        />
                    </TabsContent>
                    <TabsContent value="configPalette">
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
                </Tabs>
                <section className="flex flex-row gap-2 mt-4">
                    <ButtonLoader onLoad={onLoad} onClick={onSave}>Save</ButtonLoader>
                    <Button onClick={() => {setOpen(false)}} variant="danger">Discard</Button>
                </section>
            </SheetContent>

        </Sheet>
    )
}

export default SheetTheme