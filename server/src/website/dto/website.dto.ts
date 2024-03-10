import { IsNumber } from "class-validator";

export class GetWebsitePaginateDto {
    @IsNumber()
    page : number;
    @IsNumber()
    pageSize : number;
}