import { BACKEND_URL } from "@/lib/constants"
import * as entity from "./configTemplate.entity";
//http://localhost:4242/config-template/templateGroup
export const getAllGroup = () : Promise<entity.I_TemplateGroup[]> => {
    return fetch(`${BACKEND_URL}/config-template/templateGroup`,
        {method : "GET"})
    .then(resp =>resp.json())
 }