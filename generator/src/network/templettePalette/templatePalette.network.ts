import { BACKEND_URL } from "@/lib/constants";
import * as entity from "./templatePalette.entity";
import { BASE_HEADER } from "../contants.network";

const urlThemeGroup = `${BACKEND_URL}/theme-group`;
const urlThemePalette = `${BACKEND_URL}/theme-palette`;

export const createOneThemePalette = () => {
    throw new Error("unimplemented");
}

export const getAllThemeGroup = () : Promise<entity.ITemplateGroup[]> => {
    return (fetch(`${urlThemeGroup}`, {
        method: "GET",
        headers: BASE_HEADER,
        credentials: "include"
    })
    .then(resp => resp.json()))
}

export const createOneGroup = ( ) => {
    throw new Error("unimplemented");
}