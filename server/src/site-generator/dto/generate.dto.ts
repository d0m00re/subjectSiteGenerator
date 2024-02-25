import { IsNumber, IsString, isString } from 'class-validator';

export class GenerateDto {
  @IsString()
  subject: string;
  @IsString()
  title : string;
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