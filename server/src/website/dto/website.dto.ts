import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { IDataUpdateElem } from "../utils/parserConfig";
import { ISectionLayout } from "../website.entity";

export class CreateWebsiteDto {
    @IsString()
    title: string;
    @IsString()
    subject: string;
}

export class GetWebsitePaginateDto {
    @IsNumber()
    page: number;
    @IsNumber()
    pageSize: number;
}

export class UpdateSection {
    @IsNotEmpty()
    data: any;
    @IsNumber()
    sectionId: number;
}

export class UpdateTypography {
    @IsString()
    kind: "typography";
    @IsNumber()
    order: number;
    @IsString()
    text: string;
    @IsString()
    size: string;
    @IsString()
    variant: string;
    @IsString()
    path: string;
    @IsString()
    animation: string;
    @IsString()
    decorator: string;
}

export class UpdateButton {
    @IsString()
    kind: "button";
    @IsNumber()
    order: number;
    @IsString()
    text: string;
    @IsString()
    size: string;
    @IsString()
    variant: string;
    @IsString()
    shape: string;
    @IsString()
    actionType: string;
    @IsString()
    path: string;
    @IsString()
    animation: string;
}

export class UpdateSectionV3 {
    @IsObject()
    data: any;
    @IsNumber()
    sectionId: number;
}

export class UpdateSectionV4 {
    @IsArray()
    data : any[];
    @IsObject()
    layout ?: Partial<ISectionLayout>
    @IsNumber()
    sectionId : number;
}

export class CreateSectionV4 {
    @IsArray()
    data: IDataUpdateElem[];
    @IsNumber()
    order : number;
    @IsNumber()
    websiteId : number;
    @IsNumber()
    templateId : number;
}

export class UpdateThemeDto {
    @IsNumber()
    websiteId : number;
    @IsNumber()
    themePaletteId : number;
    @IsNumber()
    themeFontId : number;
}