import { IsEmail, IsString } from "class-validator";

export class SignUpDto {
    @IsString()
    @IsEmail()
    email : string;

    @IsString()
    password : string;
}

export class LoginDto {
    @IsString()
    @IsEmail()
    email : string;

    @IsString()
    password : string;
}

export class MeDto {}
export class LogoutDto {}