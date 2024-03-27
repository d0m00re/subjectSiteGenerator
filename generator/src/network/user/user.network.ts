import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./../contants.network";
import { IUserEntityDb } from "./user.entity";

const API_USER = `${BACKEND_URL}/userv2`;

// useless currently
export const me = async () : Promise<IUserEntityDb> => {
  return fetch(`${API_USER}/me`, {
    method: "GET",
    headers: BASE_HEADER,
    credentials: "include"
  })
  .then(resp => {
    console.log(resp.status)
    if (resp.status >= 400)
      throw new Error("user not log");
    return resp.json();
  })
  .catch(err => {
    throw err;
  })
}