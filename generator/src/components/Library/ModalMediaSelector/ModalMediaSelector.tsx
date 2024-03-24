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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as cpn from "./components"

export function ModalMediaSelector() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Select a media</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Media selector</DialogTitle>
                    <DialogDescription>
                        Reuse media or import one
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="library">Library</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="library">
                        <cpn.Library />
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