import { Module } from '@nestjs/common';
import { ThemeButtonController } from './theme-button.controller';
import { ThemeButtonService } from './theme-button.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ThemeButtonController],
  providers: [ThemeButtonService, JwtService, PrismaService]
})
export class ThemeButtonModule {}
