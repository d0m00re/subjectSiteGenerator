"use client"

import * as network from "@/network/generateWebsite/generateWebsite.network";
import { useSession } from 'next-auth/react'
import { useEffect, useState } from "react";
import { IGenerateWebSiteOutput } from "@/network/generateWebsite/generateWebsite.network";
import Pagination from "@/components/Pagination";
import navigate from "@/components/navigate";
import Skeleton from 'react-loading-skeleton'
import CardWebsite from "./CardWebsite";


interface IFetchAndLoad {
  page: number;
  pageSize: number;
}

const ListWebsite = () => {
  const { data: session } = useSession();
  const [listWebsite, setListWebsite] = useState<IGenerateWebSiteOutput | undefined>(undefined);
  const fetchAndLoad = (props: IFetchAndLoad) => {
    network.getMyWebsitePaginate({
      page: props.page,
      pageSize: props.pageSize,
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
  }

  useEffect(() => {
    fetchAndLoad({ page: 0, pageSize: 5 });
  }, [session]);

  // retrieve current website

  const changePage = (targetPage: number) => {
    if (targetPage === listWebsite?.info.count) return;
    fetchAndLoad({ page: targetPage, pageSize: 5 });
  }

  return <div className="flex flex-col gap-4">
    <h2 className=" text-2sm">Your website :</h2>
    <div>{
      (listWebsite && listWebsite.rows) ?
        <div className="flex flex-col gap-2">
          {
            listWebsite.rows.map(website =>
              <section className=" cursor-pointer" onClick={() => navigate(`/dashboard/website/${website.id}`)}>
                <CardWebsite
                  {...website}
                />
              </section>)
          }
          <Pagination
            currentPage={listWebsite.info.page}
            totalPage={Math.floor(listWebsite.info.count / listWebsite.info.pageSize)}
            changePage={changePage}
          />

        </div>
        : <div className='w-full flex flex-col gap-2'>
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
          <Skeleton className='h-16' />
        </div>

    }</div>
  </div>
}

export default ListWebsite;