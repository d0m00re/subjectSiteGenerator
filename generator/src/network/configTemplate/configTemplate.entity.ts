import z from "zod";

interface A_I_TemplateGroup {
    id : number;
    kind:string;
    //templateVariaznt : []
}

export interface A_I_TemplateVariant {
    id : number;
    name:string;
    kind: string;
    config : string;
    // websiteSections : []
    templateGroupId : number;
}


export interface A_I_TemplateElemTypography {
    id : number;
    order:number;
    variant :string;
    text : string;
    path : string;
    // websiteSectionid : number;
}

export interface A_I_TemplateElemButton {
    id : number;
    order : number;
    label : string;
    actionType : string;
    path : string;
    //websiteSectionId : number;
}

// =========================================
//---------------- parse config template data 

export const TypographyValidator = z.object({
    order: z.number(),
    kind: z.literal("text"),
    label: z.string(),
    path: z.string(),
  
    size : z.string(),
  
    variant : z.string(),
    animation : z.string(),
    decorator : z.string(),

    formVariant : z.enum(["line", "multiline"])
  });
  
  // 'variant' : '', 'animation' : '', 'decorator' : ''
  
  export const ButtonValidator = z.object({
    order: z.number(),
    kind: z.literal("button"),
    label: z.string(),
    actionType: z.string(),
    path: z.string(),
    size: z.string(),
    variant : z.string(),
    shape : z.string(),
    animation : z.string()
  });

  export const ImgValidator = z.object({
    order : z.number(),
    kind : z.literal("img"),
    //url : z.string(),
    filter : z.string(),
    radius : z.number(),
    animation : z.string(),
    label : z.string()
  });
  
  // 'variant' : '', 'shape':'', 'animation' : ''
  
  export const TemplateValidator = z.discriminatedUnion("kind", [TypographyValidator, ButtonValidator, ImgValidator]);
  export const TemplateValidatorArray = z.array(TemplateValidator);
  export type I_TemplateVariantElem_parse = z.infer<typeof TemplateValidator>
  
  /**
   * 
   * @param json string with json array with ' separator
   * @returns json
   */
  export const parseTemplateConfigStringToJSON = (json: string) : I_TemplateVariantElem_parse[] => {
    // todo : find a better way for that
    const parsedArray = JSON.parse(json.replaceAll("'", '"'));
    return TemplateValidatorArray.parse(parsedArray);
  }

  export interface I_TemplateVariant_parse {
    id : number;
    name:string;
    kind: string;
    config : I_TemplateVariantElem_parse[];
    // websiteSections : []
    templateGroupId : number;
}


//=========
//========================================================================
//---- data parsed form db data info receive
export interface ParsedTemplateGroup {
    id : number;
    kind:string;
    //templateVariaznt : []
}

export interface ParsedTemplateVariant {
    id : number;
    name:string;
    kind: string;
    config : I_TemplateVariantElem_parse[];
    // websiteSections : []
    templateGroupId : number;
}

// with parsing config
export interface FinalParsedTemplateGroup extends ParsedTemplateGroup { 
    templateVariant : ParsedTemplateVariant[];
}

// without parsing config
export interface I_TemplateGroup extends A_I_TemplateGroup{
    templateVariant : A_I_TemplateVariant[];
}