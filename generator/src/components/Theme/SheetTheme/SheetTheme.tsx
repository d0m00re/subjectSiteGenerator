import React, { useState, useEffect } from 'react';
import ConfigButton from './ConfigButton/ConfigButton';
import ConfigPalette from './ConfigPalette/ConfigPalette';
import ConfigPolicies from './ConfigPolicies/ConfigPolicies';

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
import { ITmpTheme } from './SheetTheme.entity';
import { updateTheme } from '@/network/website/website.network';
import ButtonLoader from '@/components/atoms/ButtonLoader';

function SheetTheme() {
    const [open, setOpen] = useState(false)
    const storeWebsite = useCurrentWebsiteStore();
    const [theme, setTheme] = useState<ITmpTheme>({themeId : -1});
    const [onLoad, setOnload] = useState<boolean>(false);

    useEffect(() => {
        setTheme({
            themeId : storeWebsite.website?.themePaletteId ?? -1
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
            themePaletteId : theme.themeId
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
                        <ConfigButton />
                    </TabsContent>
                    <TabsContent value="configPalette">
                        <ConfigPalette
                            theme={theme}
                            setTheme={setTheme}
                        />
                    </TabsContent>
                    <TabsContent value="configPolicies">
                        <ConfigPolicies />
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