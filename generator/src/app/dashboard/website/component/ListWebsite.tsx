"use client"

import * as network from "@/network/generateWebsite/generateWebsite.network";
import { useEffect, useState } from "react";
import { IGenerateWebSiteOutput } from "@/network/generateWebsite/generateWebsite.network";
import Pagination from "@/components/Pagination";
import CardWebsite from "./CardWebsite";
import TemplateSkeleton from "@/components/Templates/TemplateSkeleton";


interface IFetchAndLoad {
  page: number;
  pageSize: number;
}

const ListWebsite = () => {
  const [listWebsite, setListWebsite] = useState<IGenerateWebSiteOutput | undefined>(undefined);
  const fetchAndLoad = (props: IFetchAndLoad) => {
    network.getMyWebsitePaginate({
      page: props.page,
      pageSize: props.pageSize,
    })
      .then(resp => resp.json())
      .then(resp => {
        setListWebsite(resp);
      })
      .catch(err => {
        console.log("error getting all user websites")
      })
  }

  useEffect(() => {
    fetchAndLoad({ page: 0, pageSize: 5 });
  }, []); //[session]);

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
              <section className=" cursor-pointer">
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
        : <TemplateSkeleton />

    }</div>
  </div>
}

export default ListWebsite;