import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ThemeFontService } from './theme-font.service';
import { JwtCookieParserGuard } from 'src/authv2/guard/jwt-cookie-parser.guard';
import { Request, Response} from "express";
import * as dto from "./dto/themeFont.dto";

import { from } from 'form-data';
@Controller('theme-font')
export class ThemeFontController {
    constructor(
        private themeFontService : ThemeFontService
    ){}

    // get one
    @Get(':id')
    async getOne(@Param('id') id: number) {
        let data = await this.themeFontService.getWithid({id : id});
        return data;
    }
    // get all
    @Get("")
    async getAll() {
        let data = await this.themeFontService.getAll();
        return data;
    }

    // add one
    @UseGuards(JwtCookieParserGuard)
    @Post("")
    async addOne(@Req() req : Request, @Body() dto: dto.CreateOneDto) {
        let data = await this.themeFontService.createOne({
            fontName : dto.fontName,
            placeholder : dto.placeholder
        })
        return data;
    }

    // delete one
    @UseGuards(JwtCookieParserGuard)
    @Delete("")
    async deleteOneDto(@Req() req : Request, @Body() dto : dto.DeleteOneDto) {
        let data = await this.themeFontService.deleteOne({
            id : dto.id
        });

        return data;
    }
    //
}
