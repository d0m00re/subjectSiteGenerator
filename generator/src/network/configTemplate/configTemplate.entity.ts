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

export interface I_TemplateGroup extends A_I_TemplateGroup{
    templateVariant : A_I_TemplateVariant[];
}

interface A_I_TemplateElemTypography {
    id : number;
    order:number;
    variant :string;
    text : string;
    path : string;
    // websiteSectionid : number;
}

interface A_I_TemplateElemButton {
    id : number;
    order : number;
    label : string;
    actionType : string;
    path : string;

    //websiteSectionId : number;
}