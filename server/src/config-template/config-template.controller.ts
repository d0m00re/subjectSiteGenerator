import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ConfigTemplateService } from './config-template.service';
import * as dto from "./dto/configTemplate.dto"
import { Request } from 'express';
@Controller('config-template')
export class ConfigTemplateController {
    constructor(
        private configTemplateService: ConfigTemplateService
      ) { }
    
    @Post("templateGroup/create")
    async createTemplateGroup(@Req() req : Request, @Body() dto: dto.CreateTemplateGroup) {
        let data = await this.configTemplateService.createTemplateGroup({
            kind : dto.kind
        });
        return data;
    }

    @Post("templateVariant/create")
    async createTemplateVariant(@Req() req : Request, @Body() dto: dto.CreateTemplateVariant) {
        let data = await this.configTemplateService.createTemplateVariant({
            name : dto.name,
            description : dto.description,
            config : dto.config,
            previewUrl : "unimplemented",
            idTemplateGroup : dto.idTemplateGroup
        });
        return data;
    }

    @Get ("templateGroup")
    async getAllGroup(@Req() req : Request, @Body() dto: any) {
        let data = await this.configTemplateService.getTemplateGroupAll();
        return data;
    }

    @Get("templateVariant")
    async getAllVariant(@Req() req : Request, @Body() dto: any) {
        let data = await this.configTemplateService.getTemplateVariantAll();
    
        return data;
    }
}
