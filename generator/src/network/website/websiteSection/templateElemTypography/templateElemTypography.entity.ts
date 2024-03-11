export type TSizeTypography = "small" | "medium" | "big";

// typography
export interface I_TemplateElemTypography_E {
    order : number;
    text : string;
    size : TSizeTypography;
    variant : string;
    path : string;
    animation : string;
    decorator : string;
}

export interface I_TemplateElemTypography extends I_TemplateElemTypography_E {
    id : number;
    websiteSectionId : number;
}