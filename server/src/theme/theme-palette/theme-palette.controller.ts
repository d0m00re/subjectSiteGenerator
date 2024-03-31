import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ThemePaletteService } from './theme-palette.service';
import * as dto from "./dto/themePalette.dto";
import { JwtCookieParserGuard } from 'src/authv2/guard/jwt-cookie-parser.guard';

@Controller('theme-palette')
export class ThemePaletteController {
    constructor(
        private themePaletteService: ThemePaletteService
      ) { }
   //   async create(@Body() dto : dto.CreateThemeGroupDto) {

    @UseGuards(JwtCookieParserGuard)
    @Post("")
     async createWithPalette(@Body() dto : dto.CreatePaletteWithElem) {
        let data = await this.themePaletteService.createWtPaletteElem({
            themeGroupId : dto.themeGroupId,
            name : dto.name,
            paletteElements : dto.paletteElements
        });

        return data;
    }

}
