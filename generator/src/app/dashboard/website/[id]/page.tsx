"use client"

//import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { IWebsiteWtSection, getWebsiteWtId } from '@/network/generateWebsite.network'
import SectionWebsite from './SectionWebsite'
type Props = {}

function page({}: Props) {
  const [website, setWebsite] = useState<IWebsiteWtSection>();
    const searchParams = useRouter();
    const { id } = useParams() // Assuming your file is named [id].js within the appropriate directory structure
    console.log(id);
    
    if (typeof(id) !== "string") return <></>

    useEffect(() => {
      getWebsiteWtId(parseInt(id))
      .then(resp => {
        console.log("get website : ")
        console.log(resp)
        setWebsite(resp);
      })
      .catch(err => {
        console.error("error find website")
      })
    }, [])
    

  return (
    <>
      <div>page : {id}</div>
      <h1>{website?.title}</h1>
      <p>{website?.subject}</p>
      {
        website?.websiteSection?.map(resp => <SectionWebsite key={`section-website-${resp.id}`} {...resp} />)
      }
    </>
  )
}

export default page