import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "../../contants.network";
import * as entity from "./themeFont.entity";

const urlThemeFont = `${BACKEND_URL}/theme-font`;

/**
 * get all theme font
 * @returns all font array
 */
export const getAllFont = () : Promise<entity.IThemeFont[]> => {
    return (fetch(`${urlThemeFont}`, {
        method: "GET",
        headers: BASE_HEADER,
        credentials: "include"
    })
    .then(resp => resp.json()))
}

export const getOneFont = (id : number) : Promise<entity.IThemeFont> => {
    return (fetch(`${urlThemeFont}/${id}`, {
        method: "GET",
        headers: BASE_HEADER,
        credentials: "include"
    })
    .then(resp => resp.json()))
}

/**
 * delete one
 */
export const deleteOne = (id : number) : Promise<any> => {
    return (fetch(`${urlThemeFont}`, {
        method: "DELETE",
        body : JSON.stringify({id : id}),
        headers: BASE_HEADER,
        credentials: "include"
    })
    .then(resp => resp.json()))
}

export const createOne = (props : entity.ICreateOne) : Promise<any> => {
    return (fetch(`${urlThemeFont}`, {
        method: "POST",
        body : JSON.stringify(props),
        headers: BASE_HEADER,
        credentials: "include"
    })
    .then(resp => resp.json()))
}