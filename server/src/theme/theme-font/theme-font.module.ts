import { Module } from '@nestjs/common';
import { ThemeFontController } from './theme-font.controller';
import { ThemeFontService } from './theme-font.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { Userv2Service } from 'src/userv2/userv2.service';

@Module({
  controllers: [ThemeFontController],
  providers: [ThemeFontService, JwtService, PrismaService, ConfigTemplateService, Userv2Service]
})
export class ThemeFontModule {}
