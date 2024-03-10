import { Controller, Get, Param } from '@nestjs/common';
import { WebsiteService } from './website.service';

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
}