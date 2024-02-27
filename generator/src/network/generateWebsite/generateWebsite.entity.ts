/**
 * I -> INTERFACE
 * A -> ATOM
 * E -> ENTITY
 */

// ----------------------
// ------------- websiteSectionOrder
export interface A_I_WebsiteSectionOrder_E {
    order : number;
}

export interface A_I_WebsiteSectionOrder extends A_I_WebsiteSectionOrder_E {
      id: number;
      websiteSectionId: number;
      websiteId: number;
}

export interface I_WebsiteSectionOrder_E extends A_I_WebsiteSectionOrder_E {};
export interface I_WebsiteSectionOrder extends A_I_WebsiteSectionOrder {};

// ----------------------
// ------------- websiteSection
export type TWebsiteSectionKind = "mainSection" | "subSection";

export interface A_I_WebsiteSection_E {
    kind : TWebsiteSectionKind;
    title : string;
    description : string;
    backgroundImage : string;
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
}

export interface A_I_Website extends A_I_Website_E {
    id: number,
    userId: number,
}

export interface I_Website_E extends A_I_Website_E {
    websiteSection : I_WebsiteSection_E[] 
}

export interface I_Website extends A_I_Website_E {
    websiteSection : I_WebsiteSection[]
}

//------------------------ entity network
export type ISectionUpdate = Pick<A_I_WebsiteSection, "id" | "title" | 'description'>;
export type ISectionCreate = Pick<A_I_WebsiteSection, "title" | "description" | "kind">;