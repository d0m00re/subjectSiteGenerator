import { IsNumber, IsString, IsIn, IsArray, IsNotEmpty } from 'class-validator';

export class CreateOneDto {
  @IsString()
  fontName: string;
  @IsString()
  placeholder : string;
}


export class DeleteOneDto {
    @IsNumber()
    id : number;
}