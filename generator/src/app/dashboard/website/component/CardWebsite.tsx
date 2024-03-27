"use client"

import * as network from "@/network/generateWebsite/generateWebsite.network";
import { Button } from "@/components/Button";
import navigate from "@/components/navigate";
import { Pencil, Eye, Trash2 } from "lucide-react";

const CardWebsite = (props: network.IWebsiteDb) => {
    return <section className="flex flex-col items-center justify-between bg-slate-400 p-2 w-[200px] rounded">
        <div className="flex flex-col gap-2 bg-slate-400 p-2">
            <h2 className="text-1xl">{props.title}</h2>
            <p className="text-2sm">{props.subject}</p>
        </div>

        <section className="flex flex-row align gap-2">
            <Button className="self-start" onClick={() => navigate(`/dashboard/website/${props.id}`)}>
                <Pencil />
            </Button>
            <Button className="self-start" onClick={() => navigate(`/view/${props.id}`)}>
                <Eye />
            </Button>
            <Button className="self-start">
                <Trash2 color="red" />
            </Button>
        </section>
    </section>
}

export default CardWebsite;