"use client"

import { create } from 'zustand'
import { IWebsiteWtSection, ISection, getWebsiteWtId, ISectionUpdate } from '@/network/generateWebsite.network'

interface WebsiteZustand {
    websiteisLoading : "loading" | "done" | "error";
    website: IWebsiteWtSection | undefined;
    populate: (websiteId: number) => void;
    updateSection: (section: ISectionUpdate) => void;
    //incr : () => void;
    //decr : () => void;
}

const useBearStore = create<WebsiteZustand>()((set) => ({
    websiteisLoading : "loading",
    website: undefined,
    populate: (websiteId) => {
        getWebsiteWtId(websiteId)
            .then(resp => {
                set((state) => ({
                    ...state,
                    websiteisLoading : "done",
                    website: resp
                }))
            })
            .catch(err => {
                console.error("error find website : ")
                set((state) => ({
                    ...state,
                    website: undefined,
                    websiteisLoading : "error"
                }))
            })
    },
    updateSection: (section) => {     
        set((state) => {
            if (!state.website)
                return {};
            let id = state.website?.websiteSection.findIndex(_section => _section.id === section.id);
            let newWebsite = {...state.website};

            if (id === undefined || !newWebsite?.websiteSection) {
                return {};
            }
            newWebsite.websiteSection[id] = { ...newWebsite?.websiteSection[id], ...section };
            return {...state, website : newWebsite}
        })
    }
    //incr: () => set((state) => ({ bear: state.bear + 1 })),
    //decr: () => set((state) => ({ bear : state.bear - 1}))
}))

export default useBearStore;