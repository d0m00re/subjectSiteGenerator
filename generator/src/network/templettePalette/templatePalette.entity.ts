export interface ITemplateGroup {
    id : number;
    name : string;
    themePalettes : IThemePalette[]
}

export interface IThemePalette {
    id : number;
    name : string;
    themeGroupId : number;
    userId : null | number;
    themePaletteElems : IThemePaletteElem[]
}

export interface IThemePaletteElem {
    id : number;
    key : string;
    bgColor : string;
    textColor : string;
    themePaletteId : number;
}
