import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./contants.network";
import { headers } from "next/headers";

interface IGetOne {
    id: number
}

export const getOne = (props: IGetOne) => {
    return fetch(`${BACKEND_URL}/site-generator/${props.id}`,
        {
            method: "GET",
            headers: BASE_HEADER
        })
}

interface IGenerateOne {
    subject: string;
}

export const generateOne = (props: IGenerateOne) => {
    return fetch(`${BACKEND_URL}/site-generator`, {
        method: "POST",
        headers: BASE_HEADER,
        body: JSON.stringify(props)
    })
}
