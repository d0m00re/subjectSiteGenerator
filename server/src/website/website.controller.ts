import { Controller, Get, Param, Post, UseGuards, Req, Body, Patch } from '@nestjs/common';
import { WebsiteService } from './website.service';
import * as dto from "./dto/website.dto";
import { JwtCookieParserGuard } from 'src/authv2/guard/jwt-cookie-parser.guard';
import { Request } from 'express';

@Controller('website')
export class WebsiteController {
  constructor(
    private websiteService: WebsiteService
  ) { }

  @Get(':id')
  async getWtId(@Param('id') id: number) {
    let website = await this.websiteService.getWebsiteFull({ websiteId: id });
    return website;
  }

  @UseGuards(JwtCookieParserGuard)
  @Post("")
  async createWebsite(@Req() req : Request, @Body() dto: dto.CreateWebsiteDto) {
    let userId = req.user.id;

    let newWebsite = await this.websiteService.create({
      ...dto,
      userId
    })

    return newWebsite;
  }

  @UseGuards(JwtCookieParserGuard) 
  @Post("v4/section")
  async createSectionV4(@Req() req : Request, @Body() dto: dto.CreateSectionV4) {
    let userId = req.user.id;

    let data = await this.websiteService.createNewSectionV4({
      userId: userId,
      data: dto.data, //Object.fromEntries(dto.data),
      order: dto.order,
      websiteId: dto.websiteId,
      templateId: dto.templateId
    })

    return data;
  }

  @UseGuards(JwtCookieParserGuard)
  @Patch("v4/section")
  async updateSectionV4(@Req() req : Request, @Body() dto: dto.UpdateSectionV4) {
    let userId = req.user.id;

    let data = await this.websiteService.sectionUpdateV4({
      userId : userId,
      data : dto.data,
      layout : dto.layout,
      sectionId : dto.sectionId
    })

    return data;
  }
}