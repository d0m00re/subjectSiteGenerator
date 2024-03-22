import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER, generateBearerToken } from "./../contants.network";
import { ISectionLayout, I_Website } from "../generateWebsite/generateWebsite.entity";
import { ICreateWebsiteInput, TUpdateDataV4 } from "./website.entity";

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
        headers: BASE_HEADER,
        body : JSON.stringify({
            title : props.title,
            subject : props.subject
        }),
        credentials : "include"
    })
    .then(resp => resp.json()))
}


export interface ICreateWebsiteSectionV4 {
    data : TUpdateDataV4[],
    order : number;
    websiteId : number;
    templateId : number;
}

export const createWebsiteSectionV4 = (props : ICreateWebsiteSectionV4) : Promise<any> => {
    return fetch(`${API_WEBSITE_URL}/v4/section`, {
        method : "POST",
        headers : BASE_HEADER,
        body : JSON.stringify({
            data : props.data,
            order : props.order,
            websiteId : props.websiteId,
            templateId : props.templateId
        }),
        credentials : "include"
    })
}

interface IUpdateSessionV4 {
    data : TUpdateDataV4[];
    layout : ISectionLayout;
    sectionId : number;
}

export const updateSectionV4 = (props : IUpdateSessionV4) : Promise<any> => {
    return fetch(`${API_WEBSITE_URL}/v4/section`, {
        method : "PATCH",
        headers : BASE_HEADER,
        body : JSON.stringify({
            data : props.data,
            layout : props.layout,
            sectionId : props.sectionId
        }),
        credentials : "include"
    })
    .then(resp => resp.json())
}