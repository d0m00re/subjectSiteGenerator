import React, { useState, useEffect } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';
import StyleEditing from './StyleEditing';

interface IModalEditSectionStyle {
    open: boolean;
    setOpen: (val: boolean) => void;
    sectionId: number;
}

function ModalEditSectionStyle(props: IModalEditSectionStyle) {
    return (
        <Sheet open={props.open} onOpenChange={props.setOpen}>
            <SheetContent>
                <SheetHeader >
                    <SheetTitle>
                        Edit section style
                    </SheetTitle>
                </SheetHeader>
                <SheetDescription className="flex flex-col gap-4 items-center">
                    {(props.open) ? <StyleEditing
                        sectionId={props.sectionId}
                        onClose={() => props.setOpen(false)}
                    /> : <IconLoaderSpin />
                    }
                </SheetDescription>
            </SheetContent>
        </Sheet >
    ) 
}

export default ModalEditSectionStyle