import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./contants.network";

export interface IRegister {
    name: string;
    email: string;
    password: string;
}

export const register = (props: IRegister) => {
    return fetch(BACKEND_URL + "/auth/register", {
        method: "POST",
        body: JSON.stringify(props),
        headers: BASE_HEADER
    });
}

export interface ILogin {
    username: string;
    password: string;
}

export const login = (props: ILogin) => {
    return fetch(BACKEND_URL + "/auth/login", {
        method: "POST",
        body: JSON.stringify(props),
        headers: BASE_HEADER
    });
}

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