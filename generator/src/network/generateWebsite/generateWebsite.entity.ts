/**
 * rework this notation probably
 * I -> INTERFACE
 * A -> ATOM
 * E -> ENTITY
 */

import { IThemePalette } from '@/network/theme/themePalette/templatePalette.entity';
import { I_TemplateElemButton } from "../website/websiteSection/templateElemButton/templateElemButton.entity";
import { I_TemplateElemImage } from "../website/websiteSection/templateElemImage/templateElemImage.entity";
import { I_TemplateElemTypography } from "../website/websiteSection/templateElemTypography/templateElemTypography.entity";
import { I_WebsiteSectionOrder, I_WebsiteSectionOrder_E } from "../website/websiteSection/websiteSectionOrder/websiteSectionOrder.entity";
import { IThemeFont } from '../theme/themeFont/themeFont.entity';


// ----------------------
// ------------- websiteSection
export type TWebsiteSectionKind = "mainSection" | "subSection";

// global section layout
export interface ISectionLayout {
    backgroundImage : string;
    backgroundColor : string;
}

export interface A_I_WebsiteSection_E extends ISectionLayout {
    kind : TWebsiteSectionKind;
    backgroundImage : string;
    backgroundColor : string;

    buttons : I_TemplateElemButton[];
    typographies : I_TemplateElemTypography[];
    images : I_TemplateElemImage[];

    themePaletteOrder : number;

    configTemplateId : number;

    themePaletteId : number;
    themePalette : IThemePalette;
}

export interface A_I_WebsiteSection extends A_I_WebsiteSection_E {
    id : number;
    websiteId : number;
}

export interface I_WebsiteSection_E extends A_I_WebsiteSection_E {
    websiteSectionOrder : I_WebsiteSectionOrder_E 
}

export interface I_WebsiteSection extends A_I_WebsiteSection {
    websiteSectionOrder : I_WebsiteSectionOrder
}

// ----------------------
//-------------- website
export interface A_I_Website_E {
    title: string;
    subject: string;
    themePaletteId : number;
    themePalette : IThemePalette;
    themeFontId : number;
    themeFont : IThemeFont;
}

// again another one you need to rework this s******
export interface A_I_Website_E_2_Header {
    id : number;
    title: string;
    subject: string;
    userId : number;
    themePaletteId : number;
    themePalette : IThemePalette;
}


export interface A_I_Website extends A_I_Website_E {
    id: number,
    userId: number,
}

export interface I_Website_E extends A_I_Website_E {
    websiteSection : I_WebsiteSection_E[] 
}

export interface I_Website extends A_I_Website {
    websiteSection : I_WebsiteSection[]
}

//------------------------ entity network
export type ISectionUpdate = Pick<A_I_WebsiteSection, "id">;
export type ISectionCreate = Pick<A_I_WebsiteSection, "kind">;
