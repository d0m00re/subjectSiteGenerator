import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./contants.network";
import { headers } from "next/headers";

const generateBearerToken = (accessToken: string) => `Bearer ${accessToken}`;
const generateRefreshToken = (refreshToken: string) => `Refresh ${refreshToken}`;


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

export type ISection = {
    id: number;
    kind: "mainSection" | "subSection";
    title: string;
    description: string;
    backgroundImage: string;
    websiteId: number;
}

export type ISectionUpdate = Pick<ISection, "id" | "title" | 'description'>;

export type ISectionCreate = Pick<ISection, "title" | "description" | "kind">;

export interface IWebsiteWtSection {
    id: number;
    title: string;
    subject: string;
    userId: number;
    websiteSection: ISection[];
}

export const getWebsiteWtId = (id: number): Promise<IWebsiteWtSection> => {
    return (fetch(`${BACKEND_URL}/site-generator/${id}`, {
        method: "GET",
        headers: BASE_HEADER
    })
        .then(resp => resp.json()))
}