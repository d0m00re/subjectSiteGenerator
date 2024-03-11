"use client"

import { create } from 'zustand'

import * as network from "../network/configTemplate/configTemplate.network";
import * as entity from "../network/configTemplate/configTemplate.entity";

interface ITemplateZustand {
    templateGroup : entity.I_TemplateGroup[];
    // easy access all templazte variant in same array
    templateVariant : entity.A_I_TemplateVariant[];
    populate: () => void;
}

const useTemplateGroup = create<ITemplateZustand>()((set) => ({
    templateGroup : [],
    templateVariant : [],
    populate : () => {
        network
        .getAllGroup()
        .then(arrGroup => {
            console.log("resp")
            console.log(arrGroup)

            let arrVariant : entity.A_I_TemplateVariant[] = [];

            for (let i = 0; i < arrGroup.length; i++) {
                arrVariant = [
                    ...arrVariant,
                    ...arrGroup[i].templateVariant
                ]
            }

            set((state) => {
                return {
                    ...state,
                    templateGroup : arrGroup,
                    templateVariant :  arrVariant
                }
            })
        })
        .catch(err => {
            console.log("fail get template group")
        })
    }
}));

export default useTemplateGroup;