
export interface I_TemplateElemImage_E {
    order : number;
    url : string;
    filter : string;
    radius : number;
    animation : string;
}

export interface I_TemplateElemImage extends I_TemplateElemImage_E {
    id : number;
    websiteSectionId: number;
}