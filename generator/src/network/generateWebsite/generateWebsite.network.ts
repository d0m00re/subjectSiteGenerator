import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./../contants.network";
import { headers } from "next/headers";
import { A_I_WebsiteSection, I_Website, TWebsiteSectionKind } from "./generateWebsite.entity";
import { number } from "zod";

const generateBearerToken = (accessToken: string) => `Bearer ${accessToken}`;
const generateRefreshToken = (refreshToken: string) => `Refresh ${refreshToken}`;


interface IGetOne {
    id: number
}

export const getOne = (props: IGetOne) => {
    return fetch(`${BACKEND_URL}/${props.id}`,
        {
            method: "GET",
            headers: BASE_HEADER
        })
}

interface IGenerateOne {
    title: string;
    subject: string;
    accessToken: string;
}

export const generateOne = (props: IGenerateOne) => {
    return fetch(`${BACKEND_URL}/site-generator`, {
        method: "POST",
        headers: {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken),
        },
        body: JSON.stringify({
            title: props.title,
            subject: props.subject
        })
    })
        .then(resp => resp.json());
}

/*
 user update own website section
*/
export const updateWebsiteSection = (props: { title: string, description: string, sectionId: number, accessToken: string }) => {
    return fetch(`${BACKEND_URL}/site-generator/section`, {
        method: "PATCH",
        headers: {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken),
        },
        body: JSON.stringify({
            title: props.title,
            description: props.description,
            sectionId: props.sectionId
        })
    })
        .then(resp => resp.json())
}

interface ICreateWebsiteSection {
    title : string;
    description : string;
    order : number;
    websiteId : number;
    accessToken : string;
}

export const createWebsiteSection = (props : ICreateWebsiteSection) : Promise<I_Website> => {
    return fetch(`${BACKEND_URL}/site-generator/add`, {
        method : "POST",
        headers: {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken)
        },
        body: JSON.stringify({
            title : props.title,
            description : props.description,
            websiteId : props.websiteId,
            order : props.order
        })
    })
    .then(resp =>resp.json());
}

//--------

interface IGenerateWebSiteInput {
    page: number;
    pageSize: number;
    accessToken: string;
}

export interface IWebsiteDb {
    id: number;
    title: string;
    subject: string;
    userId: number;
}

interface IInfoPaginate {
    count: number;
    page: number;
    pageSize: number;
}

export interface IGenerateWebSiteOutput {
    rows: IWebsiteDb[];
    info: IInfoPaginate;
}

export const getMyWebsitePaginate = (props: IGenerateWebSiteInput) => {
    return fetch(`${BACKEND_URL}/site-generator/search`, {
        method: "POST",
        headers: {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken),
        },
        body: JSON.stringify({
            page: props.page,
            pageSize: props.pageSize
        })
    })
}

/**
 * get website with id
 * @param id number
 * @returns 
 */


export const getWebsiteWtId = (id: number): Promise<I_Website> => {
    return (fetch(`${BACKEND_URL}/site-generator/${id}`, {
        method: "GET",
        headers: BASE_HEADER
    })
        .then(resp => resp.json()))
}