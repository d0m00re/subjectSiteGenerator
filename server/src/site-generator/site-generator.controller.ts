import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import * as dto from './dto/generate.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { SiteGeneratorService } from './site-generator.service';

@Controller('site-generator')
export class SiteGeneratorController {

  constructor(
    private siteGenerator: SiteGeneratorService
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
    console.log("seartch website")
    let data = await this.siteGenerator.getUserWebsite({
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

    let result = await this.siteGenerator.updateSection({
      title : dto.title,
      description : dto.description,
      sectionId : dto.sectionId,
      email : email
    })

    return result;
  }

  // add a section
  @UseGuards(JwtGuard)
  @Post("add")
  async addSection(@Request() req, @Body() dto : dto.CreateSectionDto) {
    let email = req.user.email;
    console.log('add section')
    let result = await this.siteGenerator.createNewSection({
      websiteId : dto.websiteId,
      title : dto.title,
      description : dto.description,
      order : dto.order,
      email : email
    });

    return result;
  }
  
  // generate website
  @UseGuards(JwtGuard)
  @Post()
  async generate(@Request() req, @Body() dto: dto.GenerateDto) {
    let email = req.user.username; // come from jwt guard

    let result = await this.siteGenerator.createOneV2({
      title: dto.title,
      subject: dto.subject,
      email: email
    });

    return result;
  }
  

  @Get(':id')
  async getOne(@Param('id') id: number) {
    let website = await this.siteGenerator.getWebsiteWtId(id);
    return website;
  }
}
