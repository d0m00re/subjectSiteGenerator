export type TSizeButton = "small" | "medium" | "big";
export type TVariantButton = "solid" | "outlined";
export type TShapeButton = "round" | "square";
export type TActionTypeButton = "external" | "internal";

// button
export interface A_I_TemplateElemButton_E {
    order : number;
    text : string;
    size : TSizeButton;
    variant : TVariantButton;
    shape : TShapeButton;
    actionType : TActionTypeButton;
    path : string;
    animation : string;
}

export interface I_TemplateElemButton extends A_I_TemplateElemButton_E {
    id : number;
    websiteSectionId : number;
}