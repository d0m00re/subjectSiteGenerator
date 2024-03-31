import { IsString } from "class-validator";

export class CreateThemeGroupDto {
    @IsString()
    name : string;
}