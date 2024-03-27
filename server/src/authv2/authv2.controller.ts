import { Body, Controller, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import * as dto from "./dto/authv2.dto";
import { Authv2Service } from './authv2.service';

import { Response } from "express";

@Controller('authv2')
export class Authv2Controller {
    constructor(
        private authV2Service : Authv2Service,
    ){};

    // ok
    @Post("signUp") 
    async register(@Body() dto : dto.SignUpDto) {
        let data = await this.authV2Service.signUp({
            email : dto.email,
            password : dto.password
        });

        return data;
    }

    @Post("login")
    async login(@Res({ passthrough: true }) response: Response, @Body() dto : dto.LoginDto) {
        let data = await this.authV2Service.login({
            email : dto.email,
            password : dto.password
        })

        if (!data)
            throw new HttpException("invalid", HttpStatus.BAD_REQUEST);

        response.cookie('accessToken', data.accessToken);
        
        return {
            email : data.email
        };
    } 

    @Post("logout")
    async logout(@Req() res : Response) {
        res.clearCookie('accessToken');
        return  {msg : "logout success"};
    }
}
