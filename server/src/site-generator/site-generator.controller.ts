import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import * as dto from './dto/generate.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { SiteGeneratorService } from './site-generator.service';

@Controller('site-generator')
export class SiteGeneratorController {

  constructor(
    private siteGenerator: SiteGeneratorService
  ) { }

  @UseGuards(JwtGuard)
  @Post("search")
  async searchWebsite(@Request() req, @Body() dto: dto.GetUserWebsitesDto) {
    console.log("seartch website")
    let data = await this.siteGenerator.getUserWebsite({
      email: req.user.email,
      page: dto.page,
      pageSize : dto.pageSize,
    });
    return data;
  }

  
  @UseGuards(JwtGuard)
  @Post()
  async generate(@Request() req, @Body() dto: dto.GenerateDto) {
    let email = req.user.username; // come from jwt guard

    let result = await this.siteGenerator.createOne({
      title: dto.title,
      subject: dto.subject,
      email: email
    });

    return result;
  }
  

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return {
      id: id,
      title: 'light up',
      desc: 'je suis une jolie description',
    };
  }
}
