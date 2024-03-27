"use client"

// todo : fix type problem
import { create } from 'zustand'

import * as network from "../network/configTemplate/configTemplate.network";
import * as entity from "../network/configTemplate/configTemplate.entity";

/**
 * templateVariant : array of parsed config templateGroup sub elem
 */
interface ITemplateZustand {
    templateGroup: entity.FinalParsedTemplateGroup[]; //I_TemplateGroup[];
    // easy access all templazte variant in same array
    templateVariant: entity.I_TemplateVariant_parse[];
    populate: () => void;
}

const useTemplateGroup = create<ITemplateZustand>()((set) => ({
    templateGroup: [],
    templateVariant: [],
    populate: () => {
        network
            .getAllGroup()
            .then(arrGroup => {
                console.log("populate data")
                console.log(arrGroup);
                // let fakeParse : entity.FinalParsedTemplateGroup[] = arrGroup.map(e => {
                let shouldBeCorrectlyType: any = arrGroup.map(e => {

                    let res = e.templateVariant.map(varElem => {
                        // parse config
                        let parsedConfig = entity.parseTemplateConfigStringToJSON(varElem.config);
                        return {
                            ...varElem,
                            config: parsedConfig
                        };
                    })
                    return {
                        id: e.id,
                        kind: e.kind,
                        templateVariant: res
                    }
                })

                let arrVariant: entity.I_TemplateVariant_parse[] = [];


                // parse template variant group, easy way for accessing data
                // parse is useless now
                for (let i = 0; i < arrGroup.length; i++) {
                    let currElem = shouldBeCorrectlyType[i];

                    arrVariant = [
                        ...arrVariant,
                        ...currElem.templateVariant
                    ];
                }

                set((state) => {
                    return {
                        ...state,
                        templateGroup: shouldBeCorrectlyType,//arrGroup,
                        templateVariant: arrVariant
                    }
                })
            })
            .catch(err => {
                console.log("fail get template group")
                console.log(err);
            })
    }
}));

export default useTemplateGroup;