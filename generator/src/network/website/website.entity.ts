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
interface IUpdateTypography {
    kind : "typography"
    order : number;

    text : string;
    size : string;
    variant : string;
    path : string;
    animation : string;
    decorator : string;
}

interface IUpdateButton {
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

export interface IUpdateSectionV3 {
    data : (IUpdateTypography | IUpdateButton)[],
    sectionId : number;
    accessToken : string;
}