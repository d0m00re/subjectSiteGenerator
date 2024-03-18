import { Controller, Get, Param, Post, UseGuards, Request, Body, Patch } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import * as dto from "./dto/website.dto";

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

  @UseGuards(JwtGuard)
  @Post("")
  async createWebsite(@Request() req, @Body() dto: dto.CreateWebsiteDto) {
    let userId = req.user.userId;

    let newWebsite = await this.websiteService.create({
      ...dto,
      userId
    })

    return newWebsite;
  }

  @UseGuards(JwtGuard) 
  @Post("v4/section")
  async createSectionV4(@Request() req, @Body() dto: dto.CreateSectionV4) {
    let userId = req.user.userId;

    let data = await this.websiteService.createNewSectionV4({
      userId: userId,
      data: dto.data, //Object.fromEntries(dto.data),
      order: dto.order,
      websiteId: dto.websiteId,
      templateId: dto.templateId
    })

    return data;
  }

  @UseGuards(JwtGuard)
  @Patch("v4/section")
  async updateSectionV4(@Request() req, @Body() dto: dto.UpdateSectionV4) {
    let userId = req.user.userId;

    let data = await this.websiteService.sectionUpdateV4({
      userId : userId,
      data : dto.data,
      layout : dto.layout,
      sectionId : dto.sectionId
    })

    return data;
  }
}