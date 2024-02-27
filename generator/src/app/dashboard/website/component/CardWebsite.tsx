"use client"

import * as network from "@/network/generateWebsite/generateWebsite.network";
import { Button } from "@/components/Button";

const CardWebsite = (props: network.IWebsiteDb) => {
    return <section className="flex flex-row bg-slate-400 p-2">
        <div className="flex flex-col gap-2 bg-slate-400 p-2">
            <h2 className="text-1xl">{props.title}</h2>
            <p className="text-2sm">{props.subject}</p>
        </div>


        <section className="flex flex-row">
            <Button>edit</Button>
            <Button>view</Button>
            <Button>remove</Button>
        </section>
    </section>
}

export default CardWebsite;