import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';

import StyleEditing from '../Components/StyleEditing';

interface IModalEditSectionStyle {
    open : boolean;
    setOpen: (val : boolean) => void;
    sectionIndex : number;
}

function ModalEditSectionStyle(props: IModalEditSectionStyle) {
  return (
<Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent>
                <DialogHeader >
                    <DialogTitle>
                        Edit section style
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-col gap-4 items-center">
                    {(props.open) ? <StyleEditing
                        sectionIndex={props.sectionIndex}
                        onClose={() => props.setOpen(false)}
                    /> : <IconLoaderSpin />
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog >
    )
}

export default ModalEditSectionStyle