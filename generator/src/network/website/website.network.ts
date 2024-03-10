import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./../contants.network";
import { I_Website } from "../generateWebsite/generateWebsite.entity";

/**
 * get website with id
 * @param id number
 * @returns 
 */
export const getWebsiteWtId = (id: number): Promise<I_Website> => {
    return (fetch(`${BACKEND_URL}/website/${id}`, {
        method: "GET",
        headers: BASE_HEADER
    })
        .then(resp => resp.json()))
}