import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ThemeGroupService } from './theme-group.service';
import * as dto from "./dto/themeGroup.dto";
import { JwtCookieParserGuard } from 'src/authv2/guard/jwt-cookie-parser.guard';


@Controller('theme-group')
export class ThemeGroupController {
    constructor(
        private themeGroupService: ThemeGroupService
      ) { }

        // create
        @UseGuards(JwtCookieParserGuard)
        @Post()
        async create(@Body() dto : dto.CreateThemeGroupDto) {
            let data = await this.themeGroupService.create({
                name : dto.name
            })

            return data;
        }
        // get all
        @UseGuards(JwtCookieParserGuard)
        @Get()
        async getAll() {
            let data = await this.themeGroupService.getAll();
            return data;
        }
}
