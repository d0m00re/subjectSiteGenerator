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

interface IModalMediaSelector {
    url : string;
    setUrl : (url : string) => void;
}

export function ModalMediaSelector(props : IModalMediaSelector) {
    return (
        <Dialog>
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
                        />
                    </TabsContent>
                    <TabsContent value="upload">
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