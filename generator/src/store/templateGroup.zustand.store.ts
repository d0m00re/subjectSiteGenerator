"use client"

import { create } from 'zustand'

import * as network from "../network/configTemplate/configTemplate.network";
import * as entity from "../network/configTemplate/configTemplate.entity";

interface ITemplateZustand {
    templateGroup : entity.I_TemplateGroup[];
    populate: () => void;
}

const useTemplateGroup = create<ITemplateZustand>()((set) => ({
    templateGroup : [],
    populate : () => {
        network
        .getAllGroup()
        .then(resp => {
            console.log("resp")
            console.log(resp)
            set((state) => {
                return {
                    ...state,
                    templateGroup : resp
                }
            })
        })
        .catch(err => {
            console.log("fail get template group")
        })
    }
}));

export default useTemplateGroup;
    /*
    populate: () => {
        
    }
    */
//}));