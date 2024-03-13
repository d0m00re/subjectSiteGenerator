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