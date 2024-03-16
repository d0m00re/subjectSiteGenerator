import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import * as dto from './dto/generate.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { SiteGeneratorService } from './site-generator.service';

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
  @UseGuards(JwtGuard)
  @Post("search")
  async searchWebsite(@Request() req, @Body() dto: dto.GetUserWebsitesDto) {
    console.log("search")
    console.log(req.user)
    let data = await this.siteGeneratorService.getUserWebsite({
      email: req.user.username,
      page: dto.page,
      pageSize : dto.pageSize,
    });
    return data;
  }

  // generate website
  @UseGuards(JwtGuard)
  @Post()
  async generate(@Request() req, @Body() dto: dto.GenerateDto) {
    let email = req.user.username; // come from jwt guard

    let result = await this.siteGeneratorService.createOneV2({
      title: dto.title,
      subject: dto.subject,
      email: email
    });

    return result;
  }

  @UseGuards(JwtGuard)
  @Delete()
  async deleteSection(@Request() req, @Body() dto: dto.DeleteDto) {
    let email = req.user.username; // come from jwt guard

    let result  =await this.siteGeneratorService.deleteSection({
      email,
      sectionId : dto.sectionId
    })

    return result;
  }

  @UseGuards(JwtGuard)
  @Patch("section/moove")
  async mooveSection(@Request() req, @Body() dto : dto.MooveDto) {
    let email = req.user.username;

    let result = await this.siteGeneratorService.mooveSection({
      email,
      sectionId : dto.sectionId,
      dir : dto.dir
    });

    return result;
  }

  @UseGuards(JwtGuard)
  @Post("section/duplicate")
  async duplicateSection(@Request() req, @Body() dto : dto.DuplicateDto) {
    let email = req.user.username;

    let website = await this.siteGeneratorService.duplicateSection({
      email,
      sectionId : dto.sectionId
    });

    return website;
  }
}
