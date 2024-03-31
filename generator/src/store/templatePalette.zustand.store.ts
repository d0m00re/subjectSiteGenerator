"use client"

// todo : fix type problem
import { create } from 'zustand'

import * as network from "../network/configTemplate/configTemplate.network";
import * as entity from "../network/configTemplate/configTemplate.entity";
import { ITemplateGroup } from '@/network/templettePalette/templatePalette.entity';
import { getAllThemeGroup } from '@/network/templettePalette/templatePalette.network';


/**
 * templateVariant : array of parsed config templateGroup sub elem
 */
interface ITemplateZustand {
    templateGroups : ITemplateGroup[];
    populate: () => void;
}

const useTemplatePalette = create<ITemplateZustand>()((set) => ({
 templateGroups : [],
 populate() {
    getAllThemeGroup()
    .then(resp => {
        console.log("populate data : ")
        set((state) => ({
            ...state,
            templateGroups : resp
        }))
    })
    .catch(err => {
        console.error(err);
    }) 
 }
}));

export default useTemplatePalette;