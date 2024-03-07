import { Module } from '@nestjs/common';
import { ConfigTemplateController } from './config-template.controller';
import { ConfigTemplateService } from './config-template.service';
import { Userv2Service } from 'src/userv2/userv2.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ConfigTemplateService, Userv2Service, PrismaService, JwtService],
  controllers: [ConfigTemplateController]
})
export class ConfigTemplateModule {}
