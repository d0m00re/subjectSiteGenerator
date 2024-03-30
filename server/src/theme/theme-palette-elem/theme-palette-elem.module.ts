import { Module } from '@nestjs/common';
import { ThemePaletteElemController } from './theme-palette-elem.controller';
import { ThemePaletteElemService } from './theme-palette-elem.service';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { Userv2Service } from 'src/userv2/userv2.service';

@Module({
  controllers: [ThemePaletteElemController],
  providers: [ThemePaletteElemService, JwtService, PrismaService, ConfigTemplateService, Userv2Service]
})
export class ThemePaletteElemModule {}
