"use client"

import * as authNetwork from "@/network/auth.network";
import { create } from "zustand";

interface IMeZustand {
    userData : any;
    populate : () => void;
}

const useMe = create<IMeZustand>()((set) => ({
    userData : {},
    populate: () => {
        authNetwork
        .me()
        .then(resp => {
            console.log("me go")
            console.log(resp)
            set((state) => {
                return {
                    ...StaticRange,
                    userData : resp
                }
            })
        })
        .catch(err => {

        })
    }
}))

export default useMe;