import { IsNumber, IsString } from 'class-validator';

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