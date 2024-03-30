import { Module } from '@nestjs/common';
import { ThemePaletteController } from './theme-palette.controller';
import { ThemePaletteService } from './theme-palette.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { Userv2Service } from 'src/userv2/userv2.service';

@Module({
  controllers: [ThemePaletteController],
  providers: [ThemePaletteService, JwtService, PrismaService, ConfigTemplateService, Userv2Service]
})
export class ThemePaletteModule {}
