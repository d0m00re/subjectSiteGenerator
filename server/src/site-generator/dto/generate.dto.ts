import { IsNumber, IsString, IsIn, IsArray, IsNotEmpty } from 'class-validator';

export class GenerateDto {
  @IsString()
  subject: string;
  @IsString()
  title : string;
}

export class DeleteDto {
  @IsNumber()
  sectionId : number;
}

export class MooveDto {
    @IsNumber()
    sectionId : number;
    @IsIn(["top", "bottom"])
    dir: "top" | "bottom";
}

export class DuplicateDto {
  @IsNumber()
  sectionId : number;
}

export class GetUserWebsitesDto {
  @IsNumber()
  page : number;
  @IsNumber()
  pageSize : number;
}

export class UpdateSectionDto {
  @IsNumber()
  sectionId : number;
  @IsString()
  title : string;
  @IsString()
  description : string;
}

export class CreateSectionDto {
  @IsString()
  title : string;
  @IsString()
  description : string;
  @IsNumber()
  order : number;
  @IsNumber()
  websiteId : number;
}

export class CreateSectionDtoV2 {
  @IsNotEmpty()
  data : any;
  @IsNumber()
  order: number;
  @IsNumber()
  websiteId : number;
  @IsNumber()
  templateId : number;
}