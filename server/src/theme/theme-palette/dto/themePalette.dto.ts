import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { string } from "zod";

export class PaletteWithElem {
    @IsString()
    key: string;
    @IsString()
    bgColor: string;
    @IsString()
    textColor: string;
}

export class CreatePaletteWithElem {
    @IsNumber()
    themeGroupId: number;
    @IsString()
    name: string;
    @ValidateNested({ each: true }) // This ensures each item in the array is validated
    @Type(() => PaletteWithElem) // This tells class-transformer to instantiate PaletteWithElem objects
    paletteElements: PaletteWithElem[];
}