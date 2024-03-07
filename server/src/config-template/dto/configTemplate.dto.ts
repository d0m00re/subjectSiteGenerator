import { IsNumber, IsString, IsIn } from 'class-validator';

/*

interface ICreateTemplateVariant {
    idTemplateGroup : number;
    name : string;
    kind : string;
    config : string;
}

interface ICreateTemplateGroup {
    kind : string;
}

*/
export class CreateTemplateGroup {
    @IsString()
    kind : string;
}

export class CreateTemplateVariant {
    @IsNumber()
    idTemplateGroup : number;
    @IsString()
    name : string;
    @IsString()
    kind : string;
    @IsString()
    config : string;
}