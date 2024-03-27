import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./contants.network";
import { cookies } from "next/headers";

const API_AUTH_V2_URL = `${BACKEND_URL}/authv2`;

export interface IRegister {
    email: string;
    password: string;
}

export const register = (props: IRegister) => {
    return fetch(`${API_AUTH_V2_URL}/signUp`, {
        method: "POST",
        body: JSON.stringify(props),
        headers: BASE_HEADER
    })
    .then(resp => resp.json());
}

export interface ILogin {
    email: string;
    password: string;
}

export const login = (props: ILogin) => {
    return fetch(`${API_AUTH_V2_URL}/login`, {
        method: "POST",
        body: JSON.stringify(props),
        headers: BASE_HEADER,
        credentials : "include"
    })
    .then(resp => resp.json());
}

export const logout = () => {
    return fetch(`${API_AUTH_V2_URL}/logout`, {
        method : "POST",
        credentials : "include"
    })
    .then(resp => resp.json())
}