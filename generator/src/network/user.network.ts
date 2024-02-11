import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER } from "./contants.network";

export interface IProfile {
    id : number | string;
    accessToken : string;
}

export const me = (props: IProfile) => {
    return fetch(BACKEND_URL + `/userv2/${props.id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${props.accessToken}`,
          ...BASE_HEADER
        },
      });
}