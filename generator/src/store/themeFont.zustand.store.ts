"use client"

import { IThemeFont } from '@/network/theme/themeFont/themeFont.entity';
import { getAllFont } from '@/network/theme/themeFont/themeFont.network';
import { create } from 'zustand'


/**
 * templateVariant : array of parsed config templateGroup sub elem
 */
interface IThemeFontZustand {
    themeFont: IThemeFont[];
    populate: () => void;
}

const useThemeFont = create<IThemeFontZustand>()((set) => ({
    themeFont: [],
    populate() {
        getAllFont()
            .then(resp => {
                set((state) => ({
                    ...state,
                    themeFont: resp
                }))
            })
            .catch(err => {
                console.error(err);
            })
    }
}));

export default useThemeFont;