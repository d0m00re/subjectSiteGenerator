"use client"

// todo : fix type problem
import { create } from 'zustand'

import { ITemplateGroup } from '@/network/theme/themePalette/templatePalette.entity';
import { getAllThemeGroup } from '@/network/theme/themePalette/templatePalette.network';

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