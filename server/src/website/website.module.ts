import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { WebsiteController } from './website.controller';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { Userv2Service } from 'src/userv2/userv2.service';

@Module({
  providers: [WebsiteService, JwtService, PrismaService, ConfigTemplateService, Userv2Service],
  controllers: [WebsiteController]
})
export class WebsiteModule {}
