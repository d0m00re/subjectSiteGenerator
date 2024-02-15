import { Module } from '@nestjs/common';
import { SiteGeneratorController } from './site-generator.controller';
import { SiteGeneratorService } from './site-generator.service';
import { Userv2Service } from 'src/userv2/userv2.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [SiteGeneratorService, Userv2Service, PrismaService, JwtService],
  controllers: [SiteGeneratorController],
})
export class SiteGeneratorModule {}
