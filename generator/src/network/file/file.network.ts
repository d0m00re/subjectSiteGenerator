import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER, generateBearerToken } from "./../contants.network";

const API_FILE_URL = `${BACKEND_URL}/files`;

interface ISaveFile {
    formData : any;
    accessToken : string;
}

export const saveFile =  (props : ISaveFile) : Promise<any> => {
    return fetch(API_FILE_URL, {
        method: 'POST',
        headers: {
           // ...BASE_HEADER,
            authorization: generateBearerToken(props.accessToken)
        },
        body: props.formData
      })
      .then(resp => resp.json());
    }
 