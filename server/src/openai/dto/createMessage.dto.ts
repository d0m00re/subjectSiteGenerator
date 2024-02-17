import { IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    title: string;
    @IsString()
    subject: string;
}