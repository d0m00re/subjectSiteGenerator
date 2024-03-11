import { Controller, Get, Param, Post, UseGuards, Request, Body } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import * as dto from "./dto/website.dto";

@Controller('website')
export class WebsiteController {
    constructor(
        private websiteService: WebsiteService
    ){}

    @Get(':id')
    async getWtId(@Param('id') id: number) {
        let website = await this.websiteService.getWebsiteFull({websiteId : id});
        return website;
    }

    @UseGuards(JwtGuard)
    @Post("")
    async createWebsite(@Request() req, @Body() dto : dto.CreateWebsiteDto) {
        console.log("create website")
        console.log(req.user.userId)
        console.log("----------------------------")
        let userId = req.user.userId;

        console.log(userId)        

        let newWebsite = await this.websiteService.create({
            ...dto,
            userId
        })

        return newWebsite;
    }

    /**
   * search website with pagination
   * @param req 
   * @param dto 
   * @returns 
   */
  /*
  @UseGuards(JwtGuard)
  @Post("search")
  async searchWebsite(@Request() req, @Body() dto: dto.GetWebsitePaginateDto) {
    let data = await this.siteGeneratorService.getUserWebsite({
      email: req.user.email,
      page: dto.page,
      pageSize : dto.pageSize,
    });
    return data;
  }
  */
}