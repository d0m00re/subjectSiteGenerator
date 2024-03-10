import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { WebsiteController } from './website.controller';

@Module({
  providers: [WebsiteService, JwtService, PrismaService],
  controllers: [WebsiteController]
})
export class WebsiteModule {}
