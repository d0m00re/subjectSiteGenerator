import React from 'react';
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

function SheetTheme() {
    return (
        <Sheet>
            <SheetTrigger>Theme manager</SheetTrigger>
            <SheetContent>
                <Tabs defaultValue="configPalette" className="w-full">    
                    <TabsList>
                        <TabsTrigger value="configButton">button</TabsTrigger>
                        <TabsTrigger value="configPalette">palette</TabsTrigger>
                        <TabsTrigger value="configPolicies">policies</TabsTrigger>
                    </TabsList>
                    <TabsContent value="configButton">
                        <ConfigButton />
                    </TabsContent>
                    <TabsContent value="configPalette">
                        <ConfigPalette />
                    </TabsContent>
                    <TabsContent value="configPolicies">
                        <ConfigPolicies />
                    </TabsContent>
                </Tabs>
                <section className="flex flex-row gap-2 mt-4">
                    <Button>Save</Button>
                    <Button variant="danger">Discard</Button>
                </section>
            </SheetContent>

        </Sheet>
    )
}

export default SheetTheme