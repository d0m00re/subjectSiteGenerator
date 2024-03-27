import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Userv2Service } from './userv2.service';
import { JwtCookieParserGuard } from 'src/authv2/guard/jwt-cookie-parser.guard';
import { Request } from 'express';

@Controller('userv2')
export class Userv2Controller {
  constructor(private userService: Userv2Service) {}

  @UseGuards(JwtCookieParserGuard)
  @Get("me")
  async getMe(@Req() req : Request) {
    let {accessToken, refreshToken, password, ...dataUser} =  await this.userService.getUserWithId({userId : req.user.id});
    return dataUser;
  }

  @UseGuards(JwtCookieParserGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}
