import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GenerateDto } from './dto/generate.dto';

@Controller('site-generator')
export class SiteGeneratorController {
    @Post()
    async generate(@Body() dto : GenerateDto) {
        return {
            title : "Litght",
            desc : "test"
        }
    }

    @Get(":id")
    async getOne(@Param("id") id : number) {
        return {
            id : id,
            title : "light up",
            desc : "je suis une jolie description"
        }
    }
}
