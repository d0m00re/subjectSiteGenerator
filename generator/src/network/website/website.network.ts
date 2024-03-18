import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER, generateBearerToken } from "./../contants.network";
import { I_Website } from "../generateWebsite/generateWebsite.entity";
import { ICreateWebsiteInput } from "./website.entity";

const API_WEBSITE_URL = `${BACKEND_URL}/website`;

/**
 * get website with id
 * @param id number
 * @returns 
 */
export const getWebsiteWtId = (id: number): Promise<I_Website> => {
    return (fetch(`${API_WEBSITE_URL}/${id}`, {
        method: "GET",
        headers: BASE_HEADER
    })
        .then(resp => resp.json()));
}

export const createWebsite = (props : ICreateWebsiteInput) => {  //Promise<I_Website> => {
    return (fetch(`${API_WEBSITE_URL}`, {
        method : "POST",
        headers: {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken)
        },
        body : JSON.stringify({
            title : props.title,
            subject : props.subject
        })
    })
    .then(resp => resp.json()))
}


export interface ICreateWebsiteSectionV3 {
    data : any,
    order : number;
    websiteId : number;
    templateId : number;
    accessToken : string;
}

export const createWebsiteSectionV3 = (props : ICreateWebsiteSectionV3) : Promise<any> => {
    return fetch(`${API_WEBSITE_URL}/v3/section`, {
        method : "POST",
        headers : {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken)
        },
        body : JSON.stringify({
            data : props.data,
            order : props.order,
            websiteId : props.websiteId,
            templateId : props.templateId
        })
    })
}

interface IUpdateSessionV4 {
    accessToken : string;
    data : any[];
    layout : any;
    sectionId : number;
}

export const updateSectionV4 = (props : IUpdateSessionV4) : Promise<any> => {
    return fetch(`${API_WEBSITE_URL}/v4/section`, {
        method : "PATCH",
        headers : {
            ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken)
        },
        body : JSON.stringify({
            data : props.data,
            layout : props.layout,
            sectionId : props.sectionId
        })
    })
    .then(resp => resp.json())
}