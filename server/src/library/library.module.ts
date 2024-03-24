import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LibraryController],
  providers: [LibraryService, JwtService, PrismaService]
})

export class LibraryModule {}