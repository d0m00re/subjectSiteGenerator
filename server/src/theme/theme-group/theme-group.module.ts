import { Module } from '@nestjs/common';
import { ThemeGroupController } from './theme-group.controller';
import { ThemeGroupService } from './theme-group.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { Userv2Service } from 'src/userv2/userv2.service';

@Module({
  controllers: [ThemeGroupController],
  providers: [ThemeGroupService, JwtService, PrismaService, ConfigTemplateService, Userv2Service]
})
export class ThemeGroupModule {}
