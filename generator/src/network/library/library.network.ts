import { BACKEND_URL } from "@/lib/constants";
import { BASE_HEADER, generateBearerToken } from "./../contants.network";

const API_FILE_URL = `${BACKEND_URL}/library`;

interface ISaveFile {
  formData: any;
}

export const saveFile = (props: ISaveFile): Promise<any> => {
  return fetch(API_FILE_URL, {
    method: 'POST',
    credentials: "include",
    body: props.formData
  })
    .then(resp => resp.json());
}

export const getAllMyLibrary = () : Promise<any> => {
  return fetch(API_FILE_URL, {
    method : "GET",
    credentials : "include",
  })
  .then(resp => resp.json())
}

export const getOne = () : Promise<any> => {
  return fetch(API_FILE_URL, {
    method : "GET",
    credentials : "include"
  })
}

export const URL_IMAGE = (filename : string) => {
  return `${API_FILE_URL}/${filename}`;
}