import { IThemeButton } from "@/network/website/website.entity";

export interface ITmpTheme {
    themePaletteId : number;
    themeFontId : number;
    themeButton ?: IThemeButton;
}

export const makeEmptyTmpTheme = () : ITmpTheme => {
    return {
        themeFontId : -1,
        themePaletteId : -1,
        themeButton : undefined
    }
}