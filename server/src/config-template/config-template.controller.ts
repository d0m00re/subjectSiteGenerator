import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ConfigTemplateService } from './config-template.service';
import * as dto from "./dto/configTemplate.dto"
@Controller('config-template')
export class ConfigTemplateController {
    constructor(
        private configTemplate: ConfigTemplateService
      ) { }
    
    @Post("templateGroup/create")
    async createTemplateGroup(@Request() req, @Body() dto: dto.CreateTemplateGroup) {
        let data = await this.configTemplate.createTemplateGroup({
            kind : dto.kind
        });
        return data;
    }

    @Post("templateVariant/create")
    async createTemplateVariant(@Request() req, @Body() dto: dto.CreateTemplateVariant) {
        let data = await this.configTemplate.createTemplateVariant({
            name : dto.name,
            kind : dto.kind,
            config : dto.config,
            idTemplateGroup : dto.idTemplateGroup
        });
        return data;
    }

    @Get ("templateGroup")
    async getAllGroup(@Request() req, @Body() dto: any) {
        let data = await this.configTemplate.getTemplateGroupAll();
        return data;
    }

    @Get("templateVariant")
    async getAllVariant(@Request() req, @Body() dto: any) {
        let data = await this.configTemplate.getTemplateVariantAll();
    
        return data;
    }
}
