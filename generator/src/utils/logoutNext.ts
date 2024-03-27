"use server"
 
import { cookies } from 'next/headers'
 
const deleteCookie = () => {
    cookies().delete("accessToken");
}

export default deleteCookie;