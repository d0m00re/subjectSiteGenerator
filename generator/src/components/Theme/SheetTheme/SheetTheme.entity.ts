export interface ITmpTheme {
    themePaletteId : number;
    themeFontId : number;
}

export const makeEmptyTmpTheme = () : ITmpTheme => {
    return {
        themeFontId : -1,
        themePaletteId : -1
    }
}