import z from "zod";

// row
export interface IButtonRow {
    order: number;
    size : string;
    variant : string;
    shape : string;
    text: string;
    actionType: string;
    path: string;
    animation : string;
}

export interface ITypographyRow {
    order: number;
    size : string;
    variant : string;
    text: string;
    path: string;
    animation : string;
    decorator : string;
}

export interface IImageRow {
    order : number;
    url : string;
    filter : string;
    radius : number;
    animation : string;
}

export type IDataTemplateSubElem = IButtonRow | ITypographyRow;

// update
export interface IUpdateTypography extends ITypographyRow {
    kind : "typography"
}

export interface IUpdateButton extends IButtonRow {
    kind : "button",
}

export interface IUpdateImg extends IImageRow {
    kind : "img"
}

export type IDataUpdateElem = IUpdateTypography | IUpdateButton | IUpdateImg;

//----------------

// data parse
// form parser
export const TypographyValidator = z.object({
    kind: z.literal("text"),
    order: z.number(),
    label: z.string(),
    path: z.string()
});

export const ButtonValidator = z.object({
    kind: z.literal("button"),
    order: z.number(),
    label: z.string(),
    actionType: z.string(),
    path: z.string()
});

export const ImageValidator = z.object({
    kind: z.literal("img"),
    order : z.number(),
    url : z.string(),
    filter : z.string(),
    radius : z.number(),
    animation : z.string()
})

export const TemplateValidator = z.discriminatedUnion("kind", [TypographyValidator, ButtonValidator, ImageValidator]);
export const TemplateValidatorArray = z.array(TemplateValidator);
//

// parse json config
export const parseTemplateConfigStringToJSON = (json: string) => {
    // todo : find a better way for that
    const parsedArray = JSON.parse(json.replaceAll("'", '"'));
    console.log("parse that : ")
    console.log(parsedArray)
    return TemplateValidatorArray.parse(parsedArray);
}