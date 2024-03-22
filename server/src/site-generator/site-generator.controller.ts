import { Body, Controller, Delete, Patch, Post, UseGuards, Req } from '@nestjs/common';
import * as dto from './dto/generate.dto';
import { SiteGeneratorService } from './site-generator.service';
import { JwtCookieParserGuard } from 'src/authv2/guard/jwt-cookie-parser.guard';
import { Request } from 'express';

@Controller('site-generator')
export class SiteGeneratorController {

  constructor(
    private siteGeneratorService: SiteGeneratorService
  ) { }

  /**
   * search website with pagination
   * @param req 
   * @param dto 
   * @returns 
   */
  @UseGuards(JwtCookieParserGuard)
  @Post("search")
  async searchWebsite(@Req() req : Request, @Body() dto: dto.GetUserWebsitesDto) {
    console.log("search")
    console.log(req?.user)
    let data = await this.siteGeneratorService.getUserWebsite({
      email: req.user.email,
      page: dto.page,
      pageSize : dto.pageSize,
    }); 
    return data;
  }

  // generate website
  @UseGuards(JwtCookieParserGuard)
  @Post()
  async generate(@Req() req : Request, @Body() dto: dto.GenerateDto) {
    let email = req.user.email; // come from jwt guard

    let result = await this.siteGeneratorService.createOneV2({
      title: dto.title,
      subject: dto.subject,
      email: email
    });

    return result;
  }

  @UseGuards(JwtCookieParserGuard)
  @Delete()
  async deleteSection(@Req() req : Request, @Body() dto: dto.DeleteDto) {
    let email = req.user.email; // come from jwt guard

    let result  =await this.siteGeneratorService.deleteSection({
      email,
      sectionId : dto.sectionId
    })

    return result;
  }

  @UseGuards(JwtCookieParserGuard)
  @Patch("section/moove")
  async mooveSection(@Req() req : Request, @Body() dto : dto.MooveDto) {
    let email = req.user.email;

    let result = await this.siteGeneratorService.mooveSection({
      email,
      sectionId : dto.sectionId,
      dir : dto.dir
    });

    return result;
  }

  @UseGuards(JwtCookieParserGuard)
  @Post("section/duplicate")
  async duplicateSection(@Req() req : Request, @Body() dto : dto.DuplicateDto) {
    let email = req.user.email;

    let website = await this.siteGeneratorService.duplicateSection({
      email,
      sectionId : dto.sectionId
    });

    return website;
  }
}
