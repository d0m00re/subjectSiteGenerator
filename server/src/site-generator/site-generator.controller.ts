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
    let data = await this.siteGeneratorService.getUserWebsite({
      email: req.user.email,
      page: dto.page,
      pageSize : dto.pageSize,
    });
    return data;
  }

  // update a section
  @UseGuards(JwtGuard)
  @Patch("section")
  async updateSection(@Request() req, @Body() dto: dto.UpdateSectionDto) {
    let email = req.user.username; // come from jwt guard

    let result = await this.siteGeneratorService.updateSection({
     // title : dto.title,
     // description : dto.description,
      sectionId : dto.sectionId,
      email : email
    })

    return result;
  }

  // add a section
  @UseGuards(JwtGuard)
  @Post("section/add")
  async addSection(@Request() req, @Body() dto : dto.CreateSectionDto) {
    let email = req.user.email;
    let result = await this.siteGeneratorService.createNewSection({
      websiteId : dto.websiteId,
    //  title : dto.title,
    //  description : dto.description,
      order : dto.order,
      email : email
    });

    return result;
  }

  @UseGuards(JwtGuard)
  @Post("section/add-v2")
  async addSectionV2(@Request() req, @Body() dto : dto.CreateSectionDtoV2) {
    let email = req.user.email;
  
    let result = await this.siteGeneratorService.createNewSectionV2({
      email,
      data : dto.data,
      order : dto.order,
      websiteId : dto.websiteId,
      templateId : dto.templateId
    });

    return result;
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
