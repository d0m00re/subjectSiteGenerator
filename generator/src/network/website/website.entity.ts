export interface ICreateWebsiteInput {
    accessToken : string;
    title : string;
    subject : string;
}

export interface IUpdateSectionV2 {
    data : any;
    sectionId : number;
    accessToken : string;
}

// update v3
export interface IUpdateV3Typography {
    kind : "typography"
    order : number;

    text : string;
    size : string;
    variant : string;
    path : string;
    animation : string;
    decorator : string;
}

export interface IUpdateV3Button {
    kind : "button",
    order : number;

    text : string;
    size : string;
    variant : string;
    shape : string;
    actionType : string;
    path : string;
    animation : string;
}

export type TUpdateDataV3 = (IUpdateV3Typography | IUpdateV3Button); 
export type UpdateDataV3Dico  = {[key: string]: TUpdateDataV3};

export interface IUpdateSectionV3 {
    data : TUpdateDataV3[],
    sectionId : number;
    accessToken : string;
} 