"use client"

import { z } from "zod";
import * as network from "@/network/generateWebsite.network";
import { useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
import { IGenerateWebSiteOutput } from "@/network/generateWebsite.network";

const CardWebsite = (props : network.IWebsiteDb) => {
  return <section className="flex flex-col gap-2 bg-slate-400 p-2">
    <h2 className="text-1xl">{props.title}</h2>
    <p className="text-2sm">{props.subject}</p>
  </section>
}

const ListWebsite = () => {
  const { data: session } = useSession();
  const [listWebsite, setListWebsite] = useState<IGenerateWebSiteOutput | undefined>(undefined);

  useEffect(() => {
    network.getMyWebsitePaginate({
      page: 0,
      pageSize: 5,
      accessToken: session?.backendTokens?.accessToken ?? ""
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log("all website")
        console.log(resp)
        setListWebsite(resp);
      })
      .catch(err => {
        console.log("error getting all user websites")
      })
  }, [session]);

  // retrieve current website

  return <div className="flex flex-col gap-4">
    <div>list</div>
    <div>{
      (listWebsite && listWebsite.rows) ?
        <div className="flex flex-col gap-2">
          {
            listWebsite.rows.map(website => <CardWebsite {...website} />)
          }
        </div>
        : <> no data</>

    }</div>
  </div>
}

export default ListWebsite;