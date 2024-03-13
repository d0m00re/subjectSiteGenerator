import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWebsiteDto {
    @IsString()
    title : string;
    @IsString()
    subject : string;
}

export class GetWebsitePaginateDto {
    @IsNumber()
    page : number;
    @IsNumber()
    pageSize : number;
}

export class UpdateSection {
    @IsNotEmpty()
    data : any;
    @IsNumber()
    sectionId : number;
}

// update v3

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
 @IsOptional()
 @IsString({ each: true })
 data: (UpdateTypography | UpdateButton)[];
 @IsNumber()
 sectionId: number;
}