import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./contants.network";

const API_AUTH_V2_URL = `${BACKEND_URL}/authv2`;

export interface IRegister {
    email: string;
    password: string;
}



export const register = (props: IRegister) => {
    return fetch(API_AUTH_V2_URL + "/signUp", {
        method: "POST",
        body: JSON.stringify(props),
        headers: BASE_HEADER
    });
}

export interface ILogin {
    email: string;
    password: string;
}

export const login = (props: ILogin) => {
    return fetch(API_AUTH_V2_URL + "/login", {
        method: "POST",
        body: JSON.stringify(props),
        headers: BASE_HEADER,
        credentials : "include"
    });
}

export const me = () => {
    return fetch(API_AUTH_V2_URL + "/me", {
        method : "GET",
        headers : BASE_HEADER,
        credentials : "include"
    });
}

// OLD API -----==========================================

export interface IRefreshToken {
    refreshToken: string;
}

export const refreshToken = (props: IRefreshToken) => {
    //async function refreshToken(token: JWT): Promise<JWT> {
    return fetch(BACKEND_URL + "/auth/refresh", {
        method: "POST",
        headers: {
            authorization: `Refresh ${props.refreshToken}`,
            ...BASE_HEADER
        },
    });
}