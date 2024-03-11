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
