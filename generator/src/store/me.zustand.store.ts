"use client"

import * as userNetwork from "@/network/user/user.network";
import { IUserEntityDb } from "@/network/user/user.entity";
import { create } from "zustand";

interface IMeZustand {
    userData: IUserEntityDb;
    populate: () => void;
    reset: () => void;
    setDataUser : (user : Partial<IUserEntityDb>) => void;
}

const useMe = create<IMeZustand>()((set) => ({
    userData: {
        id: -2,
        email: "",
        name: "",
        pictureUrl: ""
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
                        userData: resp
                    }
                })
            })
            .catch(err => {
                console.log("*** error log")
                set((state) => {
                    return {
                        ...state,
                        userData: {
                            ...state.userData,
                            id: -1
                        }
                    }
                })
            })
    },
    setDataUser: (user : Partial<IUserEntityDb>) => {
        set((state) => {
            return {
                ...state,
                userData : {
                    ...state.userData,
                    ...user
                } 
            }
        })  
    },
    reset: () => {
        set((state) => {
            return {
                ...state,
                userData: {
                    id: -1,
                    email: "",
                    name: "",
                    pictureUrl: ""
                }
            }
        })
    }
}))

export default useMe;