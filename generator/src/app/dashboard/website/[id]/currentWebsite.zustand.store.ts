"use client"

import { create } from 'zustand'
import { deleteWebsiteSection, getWebsiteWtId, } from '@/network/generateWebsite/generateWebsite.network'
import { A_I_WebsiteSectionOrder, ISectionUpdate, I_Website, I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';
import cloneDeep from "lodash/cloneDeep";
interface WebsiteZustand {
    websiteisLoading: "loading" | "done" | "error";
    website: I_Website | undefined;
    populate: (websiteId: number) => void;
    updateSection: (section: ISectionUpdate) => void;
    resetWtData: (data: I_Website) => void;
    deleteWebsiteSection: (sectionId: number) => Promise<void>;
    sectionOrderSwitch: (data : A_I_WebsiteSectionOrder[]) => void;
    sectionDuplicate: (sectionid : I_WebsiteSection) => void;
}

const useCurrentWebsiteStore = create<WebsiteZustand>()((set) => ({
    websiteisLoading: "loading",
    website: undefined,

    populate: (websiteId) => {
        getWebsiteWtId(websiteId)
            .then(resp => {
                let newSec = resp.websiteSection.sort(
                    (s1, s2) =>
                        s1.websiteSectionOrder.order - s2.websiteSectionOrder.order);

                resp.websiteSection = newSec;

                set((state) => ({
                    ...state,
                    websiteisLoading: "done",
                    website: resp
                }))
            })
            .catch(err => {
                console.error("error find website : ")
                set((state) => ({
                    ...state,
                    website: undefined,
                    websiteisLoading: "error"
                }))
            })
    },

    resetWtData: (data) => {
        data.websiteSection = data.websiteSection.sort(
            (s1, s2) =>
                s1.websiteSectionOrder.order - s2.websiteSectionOrder.order);
        set((state) => ({
            ...state,
            website : data,
            websiteisLoading: "done",
        }))
    },

    sectionOrderSwitch: (data) => {
        set((state) => {
            if (data.length !== 2) return state;

            let website = state.website;

            let i1 = website?.websiteSection.findIndex((sectionElem) => sectionElem.websiteSectionOrder.id === data[0].id);
            let i2 = website?.websiteSection.findIndex((sectionElem) => sectionElem.websiteSectionOrder.id === data[1].id);

            if (!website?.websiteSection || i1 === undefined || i2 === undefined) return state;

            website.websiteSection[i1].websiteSectionOrder.order = data[0].order;
            website.websiteSection[i2].websiteSectionOrder.order = data[1].order;

            return {
                ...state,
                website : cloneDeep(website)
            }
        })
    },

    sectionDuplicate: (section) => {
        console.log("section duplicate")

        set((state) => {
            console.log("section duplicate")
            return state;
        })
    },

    updateSection: (section) => {
        set((state) => {
            if (!state.website)
                return {};
            let id = state.website?.websiteSection.findIndex(_section => _section.id === section.id);
            let newWebsite = { ...state.website };
            if (id === undefined || !newWebsite?.websiteSection) {
                return {};
            }
            newWebsite.websiteSection[id] = { ...newWebsite?.websiteSection[id], ...section };
            return { ...state, website: newWebsite }
        })
    },

    deleteWebsiteSection: async (sectionId : number) => {
        set((state) => {
            let newWebsite = state.website;

            if (!newWebsite) return state;
            let indexSectionDelete = newWebsite.websiteSection.findIndex(e => e.id === sectionId);
            if (indexSectionDelete === -1) return state;

            let orderSectionDelete = newWebsite.websiteSection[indexSectionDelete].websiteSectionOrder.order;
            newWebsite.websiteSection = newWebsite.websiteSection
                .filter(wSection => wSection.id !== sectionId)
                .map(wSection => {
                    if (orderSectionDelete > wSection.websiteSectionOrder.order)
                        return wSection;
                    wSection.websiteSectionOrder.order -= 1;
                    return wSection;
                })
            return {
                ...state,
                website : newWebsite
            }
        })
    }
}))

export default useCurrentWebsiteStore;