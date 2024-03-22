export interface ICreateWebsiteInput {
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

export type TUpdateDataV4 = (IUpdateTypography | IUpdateButton); 

export interface ISectionLayout {
    backgroundImage : string;
    backgroundColor : string;
}

export interface IUpdateSectionV4 {
    layout : ISectionLayout;
    data : TUpdateDataV4[];
    sectionId : number;
}