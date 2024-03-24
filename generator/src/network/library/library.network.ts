import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER, generateBearerToken } from "./../contants.network";

const API_FILE_URL = `${BACKEND_URL}/library`;

interface ISaveFile {
    formData : any;
}

export const saveFile =  (props : ISaveFile) : Promise<any> => {
    return fetch(API_FILE_URL, {
        method: 'POST',
        credentials : "include",
        body: props.formData
      })
      .then(resp => resp.json());
    }
 