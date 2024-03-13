import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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