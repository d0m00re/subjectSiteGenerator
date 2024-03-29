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

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

function ModalEditContentAndStyle(props: Props) {
    return (
        <Sheet open={props.open} onOpenChange={props.setOpen}>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <Tabs defaultValue="account" className="w-[800px]">
                    <TabsList>
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="style">Style</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content">
                        content                        
                    </TabsContent>
                    <TabsContent value="style">
                        style
                    </TabsContent>
                </Tabs>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default ModalEditContentAndStyle