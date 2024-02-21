import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./contants.network";
import { headers } from "next/headers";

interface IGetOne {
    id: number
}

export const getOne = (props: IGetOne) => {
    return fetch(`${BACKEND_URL}//${props.id}`,
        {
            method: "GET",
            headers: BASE_HEADER
        })
}

interface IGenerateOne {
    title : string;
    subject: string;
    accessToken : string;
}

export const generateOne = (props: IGenerateOne) => {
    return fetch(`${BACKEND_URL}/site-generator`, {
        method: "POST",
        headers: {
            ...BASE_HEADER,
            authorization: `Bearer ${props.accessToken}`,
        },
        body: JSON.stringify({
            title : props.title,
            subject : props.subject
        })
    })
}

//--------

interface IGenerateWebSiteInput {
    page : number;
    pageSize : number;
    accessToken : string;
}

export interface IWebsiteDb {
    id : number;
    title : string;
    subject : string;
    userId : number;
}

interface IInfoPaginate {
    count : number;
    page : number;
    pageSize : number;
}

export interface IGenerateWebSiteOutput {
    rows : IWebsiteDb[];
    info : IInfoPaginate;
}

export const getMyWebsitePaginate = (props : IGenerateWebSiteInput) => {
    return fetch(`${BACKEND_URL}/site-generator/search`, {
        method : "POST",
        headers : {
            ...BASE_HEADER,
            authorization: `Bearer ${props.accessToken}`,
        },
        body : JSON.stringify({
            page : props.page,
            pageSize : props.pageSize
        })
    })
}

/**
 * get website with id
 * @param id number
 * @returns 
 */

export interface ISection {
    id : number;
    kind : "mainSection" | "subSection";
    title : string;
    description : string;
    backgroundImage : string;
    websiteId : number;
}

export interface IWebsiteWtSection {
    id : number;
    title : string;
    subject : string;
    userId : number;
    websiteSection : ISection[];
}

export const getWebsiteWtId = (id : number) : Promise<IWebsiteWtSection>  => {
    return (fetch(`${BACKEND_URL}/site-generator/${id}`, {
        method : "GET",
        headers : BASE_HEADER
    })
    .then(resp => resp.json()))
}