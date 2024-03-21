import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import * as dto from "./dto/authv2.dto";
import { Userv2Service } from 'src/userv2/userv2.service';
import { JwtService } from '@nestjs/jwt';
import { Authv2Service } from './authv2.service';

import { Response, Request } from "express";
import { JwtCookieParserGuard } from './jwt-cookie-parser.guard';

@Controller('authv2')
export class Authv2Controller {
    constructor(
        private userV2Service: Userv2Service,
        private authV2Service : Authv2Service,
        private jwtService : JwtService
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

        if (!data) {
            throw new HttpException("invalid", HttpStatus.BAD_REQUEST);
        }

        response.cookie('accessToken', data.accessToken);
        
        return {
            email : data.email
        };
    } 

    @Post("logout")
    async logout(@Body() dto : dto.LogoutDto) {
        let data = await this.authV2Service.logout({});
        return data;
    }

    @Get("me")
    @UseGuards(JwtCookieParserGuard)
    async me(@Req() request: Request,  @Body() dto : dto.MeDto) {
        // request :
        console.log("me : ")
        // @ts-ignore
        let user = request?.user;
        //let data = await this.authV2Service.me({accessToken : request.cookies.accessToken});
        return user; 
    }
}
