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

interface IDeleteOneWebsiteSection {
    sectionId : number;
    accessToken : string;
}

export const deleteWebsiteSection = (props : IDeleteOneWebsiteSection) : Promise<{sectionId : number}> => {
    return fetch(`${BACKEND_URL}/site-generator`, {
        method : "DELETE",
        headers: {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken),
        },
        body: JSON.stringify({
            sectionId : props.sectionId
        })
    }).then(resp => resp.json());

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

/*
 switch pos website
 id	29
order	2
websiteSectionId	95
websiteId	44
*/
export const switchPosWebsiteSection = (props: { sectionId: number, dir : "top" | "bottom", accessToken: string }) : Promise<A_I_WebsiteSectionOrder[]> => {
    return fetch(`${BACKEND_URL}/site-generator/section/moove`, {
        method: "PATCH",
        headers: {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken),
        },
        body: JSON.stringify({
            dir: props.dir,
            sectionId: props.sectionId
        })
    })
        .then(resp => resp.json())
}

export const duplicateWebsiteSection = (props: { sectionId: number, accessToken: string }) : Promise<I_Website> => {
    return fetch(`${BACKEND_URL}/site-generator/section/duplicate`, {
        method: "POST",
        headers: {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken),
        },
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
    accessToken : string;
}

export interface ICreateWebsiteSectionV2 {
    data : any[],
    order : number;
    websiteId : number;
    templateId : number;
    accessToken : string;
}

export const createWebsiteSection = (props : ICreateWebsiteSection) : Promise<I_Website> => {
    return fetch(`${BACKEND_URL}/site-generator/section/add`, {
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
};

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

