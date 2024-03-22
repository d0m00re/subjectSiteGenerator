import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER, generateBearerToken } from "./../contants.network";
import { I_Website } from "./generateWebsite.entity";
import { A_I_WebsiteSectionOrder } from "../website/websiteSection/websiteSectionOrder/websiteSectionOrder.entity";

interface IGetOne {
    id: number
}

export const getOne = (props: IGetOne) => {
    return fetch(`${BACKEND_URL}/${props.id}`,
        {
            method: "GET",
            headers: BASE_HEADER
        })
        .then(resp => resp.json());
}

interface IGenerateOne {
    title: string;
    subject: string;
}

export const generateOne = (props: IGenerateOne) => {
    return fetch(`${BACKEND_URL}/site-generator`, {
        method: "POST",
        headers: BASE_HEADER,
        body: JSON.stringify({
            title: props.title,
            subject: props.subject
        }),
        credentials : "include"
    })
        .then(resp => resp.json());
}

interface IDeleteOneWebsiteSection {
    sectionId : number;
}

export const deleteWebsiteSection = (props : IDeleteOneWebsiteSection) : Promise<{sectionId : number}> => {
    return fetch(`${BACKEND_URL}/site-generator`, {
        method : "DELETE",
        headers: BASE_HEADER,
        credentials : "include",
        body: JSON.stringify({
            sectionId : props.sectionId
        }
        )
    }).then(resp => resp.json());

}

/*
 user update own website section
*/
interface IUpdateWebsiteSection {
    title: string,
    description: string,
    sectionId: number
}

export const updateWebsiteSection = (props: IUpdateWebsiteSection) => {
    return fetch(`${BACKEND_URL}/site-generator/section`, {
        method: "PATCH",
        credentials : "include",
        headers: BASE_HEADER,
        body: JSON.stringify({
            title: props.title,
            description: props.description,
            sectionId: props.sectionId
        })
    })
        .then(resp => resp.json())
}

/*
 switch pos website
 id	29
order	2
websiteSectionId	95
websiteId	44
*/

interface ISwitchPosition {
    sectionId: number,
    dir : "top" | "bottom"
}

export const switchPosWebsiteSection = (props: ISwitchPosition) : Promise<A_I_WebsiteSectionOrder[]> => {
    return fetch(`${BACKEND_URL}/site-generator/section/moove`, {
        method: "PATCH",
        headers: BASE_HEADER,
        body: JSON.stringify({
            dir: props.dir,
            sectionId: props.sectionId
        }),
        credentials : "include"
    })
        .then(resp => resp.json())
}

interface IDuplicateWebsiteSection {
    sectionId : number
}

export const duplicateWebsiteSection = (props: IDuplicateWebsiteSection) : Promise<I_Website> => {
    return fetch(`${BACKEND_URL}/site-generator/section/duplicate`, {
        method: "POST",
        headers: BASE_HEADER,
        credentials : "include",
        body: JSON.stringify({
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
}

export interface ICreateWebsiteSectionV2 {
    data : any[],
    order : number;
    websiteId : number;
    templateId : number;
}

export const createWebsiteSection = (props : ICreateWebsiteSection) : Promise<I_Website> => {
    return fetch(`${BACKEND_URL}/site-generator/section/add`, {
        method : "POST",
        headers: BASE_HEADER,
        credentials : "include",
        body: JSON.stringify({
            title : props.title,
            description : props.description,
            websiteId : props.websiteId,
            order : props.order
        })
    })
    .then(resp =>resp.json());
};

interface IGenerateWebSiteInput {
    page: number;
    pageSize: number;
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
        credentials : "include",
        headers: BASE_HEADER,
        body: JSON.stringify({
            page: props.page,
            pageSize: props.pageSize
        })
    })
}

