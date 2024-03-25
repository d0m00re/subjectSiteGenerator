import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as cpn from "./components"
import { useState } from "react";

interface IModalMediaSelector {
    url : string;
    setUrl : (url : string) => void;
}

export function ModalMediaSelector(props : IModalMediaSelector) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Select a media</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px]">
                <DialogHeader>
                    <DialogTitle>Media selector</DialogTitle>
                    <DialogDescription>
                        Reuse media or import one
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="account" className="w-[800px]">
                    <TabsList>
                        <TabsTrigger value="library">Library</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="library">
                        <cpn.Library
                            currentImg={props.url}
                            setCurrentImg={props.setUrl}
                            onCloseModal={() => {setOpen(false)}}
                        />
                    </TabsContent>
                    <TabsContent value="upload" className="">
                        <cpn.Upload />
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default ModalMediaSelector;