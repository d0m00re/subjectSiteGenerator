export interface ICreateWebsiteInput {
    accessToken : string;
    title : string;
    subject : string;
}

// update v3
export interface IUpdateTypography {
    kind : "typography"
    order : number;

    text : string;
    size : string;
    variant : string;
    path : string;
    animation : string;
    decorator : string;
}

export interface IUpdateButton {
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

export type TUpdateDataV3 = (IUpdateTypography | IUpdateButton); 

export interface IUpdateSectionV4 {
    layout : any[];
    data : TUpdateDataV3[];
    sectionId : number;
    accessToken : string;
}