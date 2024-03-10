import { Module } from '@nestjs/common';
import { SiteGeneratorController } from './site-generator.controller';
import { SiteGeneratorService } from './site-generator.service';
import { Userv2Service } from 'src/userv2/userv2.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { OpenAIService } from 'src/openai/openai.service';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { WebsiteService } from 'src/website/website.service';

@Module({
  providers: [
    SiteGeneratorService,
    OpenAIService,
    Userv2Service,
    PrismaService,
    JwtService,
    ConfigTemplateService,
    WebsiteService
  ],
  controllers: [SiteGeneratorController],
})
export class SiteGeneratorModule {}
