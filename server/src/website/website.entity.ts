import { IDataUpdateElem } from "./utils/parserConfig";

export interface ICreateNewSectionV3 {
    userId: number;
    data: IDataUpdateElem[];//{ [key: string]: IDataUpdateElem }; // json object
    order: number;
    websiteId: number;
    templateId: number;
}

export interface IUpdateThemeV1 {
    websiteId : number;
    themePaletteId : number;
    userId : number;
    themeFontId : number;
    themeButton : IThemeButton;//ThemeButton;
}

/**
 * prepare v3 update / create
 */
export interface IUpdateV3 {
    data: { [key: string]: IDataUpdateElem }; // json object
    sectionId: number;
    userId: number;
}

export interface IUpdateV4 {
    data: IDataUpdateElem[];
    layout ?: Partial<ISectionLayout>;
    sectionId: number;
    userId: number;
}

export interface ISectionLayout {
    themePaletteOrder : number;
    themeSectionSpacing : IThemeSectionSpacing;
}

//--------------------------------------------
export interface IThemeButtonElem {
    id : number;
    name : string;
    variant : string;
    shape : string;
}

export interface IThemeButton {
    id : number;
    themeButtonArr : IThemeButtonElem[]
    websiteId : number;
}

// THEME SECTION SPACING
export type TSizeThemeSectionSpacing = "none" | "small" | "medium" | "big";
export type THoriAlignSectionSpacing = "none" | "left" | "center" | "right";
export interface IThemeSectionSpacing {
    top : TSizeThemeSectionSpacing;
    bottom : TSizeThemeSectionSpacing;
    horizontalAlign : THoriAlignSectionSpacing;
}

export interface IThemeSectionSpacing_db extends IThemeSectionSpacing {
    id : number;
}