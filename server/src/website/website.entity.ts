import { IDataUpdateElem } from "./utils/parserConfig";

export interface ICreateNewSectionV3 {
    userId: number;
    data: IDataUpdateElem[];//{ [key: string]: IDataUpdateElem }; // json object
    order: number;
    websiteId: number;
    templateId: number;
}

/**
 * prepare v3 update / create
 */
export interface IUpdateV3 {
    data: { [key: string]: IDataUpdateElem }; // json object
    sectionId: number;
    userId: number;
}

export interface IUpdateV4 {
    data: IDataUpdateElem[];
    layout ?: Partial<ISectionLayout>;
    sectionId: number;
    userId: number;
}

export interface ISectionLayout {
    backgroundImage : string;
    backgroundColor : string;
}