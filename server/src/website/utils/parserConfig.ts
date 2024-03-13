import z from "zod";

/*
buttons : {
                    create : [
                        {
                            order : 0,
                            label : "",
                            actionType : "",
                            path : ""
                        }
                    ]
                },
                typographies : {
                    create : [
                        {
                            order : 0,
                            text : "",
                            variant : "",
                            path : ""
                        }
                    ]
                }
*/

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


//----------------

// data parse
// form parser
export const TypographyValidator = z.object({
    order: z.number(),
    kind: z.literal("text"),
    label: z.string(),
    path: z.string()
});

export const ButtonValidator = z.object({
    order: z.number(),
    kind: z.literal("button"),
    label: z.string(),
    actionType: z.string(),
    path: z.string()
});

export const ImageValidator = z.object({
    order : z.number(),
    kind: z.literal("image"),
    url : z.string(),
    filter : z.string(),
    radius : z.number(),
    animation : z.string()
})

export const TemplateValidator = z.union([TypographyValidator, ButtonValidator]);
export const TemplateValidatorArray = z.array(TemplateValidator);
//

// parse json config
export const parseTemplateConfigStringToJSON = (json: string) => {
    // todo : find a better way for that
    const parsedArray = JSON.parse(json.replaceAll("'", '"'));
    return TemplateValidatorArray.parse(parsedArray);
}
//