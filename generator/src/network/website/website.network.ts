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