import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

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

// update v3
/*
type JsonObjectWithUnknownKeys = {
 [key: string]: AOrB;
};
*/
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

// UpdateTypography | UpdateButton

/*
export class UpdateSectionV3 {
    @IsObject()
    @ValidateNested()
    data: Map<string, UpdateTypography | UpdateButton>;
    @IsNumber()
    sectionId: number;
}

export class CreateSectionV3 {
    @IsObject()
    @ValidateNested()
    data: Map<string, UpdateTypography | UpdateButton>;
    @IsNumber()
    order : number;
    @IsNumber()
    websiteId : number;
    @IsNumber()
    templateId : number;
}
*/

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
    layout : any;
    @IsNumber()
    sectionId : number;
}

export class CreateSectionV3 {
    @IsObject()
    data: any;
    @IsNumber()
    order : number;
    @IsNumber()
    websiteId : number;
    @IsNumber()
    templateId : number;
}