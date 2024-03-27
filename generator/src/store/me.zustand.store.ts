"use client"

import * as userNetwork from "@/network/user/user.network";
import { IUserEntityDb } from "@/network/user/user.entity";
import { create } from "zustand";

interface IMeZustand {
    userData : IUserEntityDb;
    populate : () => void;
}

const useMe = create<IMeZustand>()((set) => ({
    userData : {
        id : -2,
        email : "",
        name : "",
        pictureUrl : ""
    },
    populate: () => {
        userNetwork
        .me()
        .then(resp => {
            console.log("*** success log")
            console.log(resp)
            set((state) => {
                return {
                    ...state,
                    userData : resp
                }
            })
        })
        .catch(err => {
            console.log("*** error log")
            set((state) => {
                return {
                    ...state,
                    userData : {
                        ...state.userData,
                        id : -1
                    }
                }
            })
        })
    }
}))

export default useMe;