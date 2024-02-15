import { Module } from '@nestjs/common';
import { Userv2Service } from './userv2.service';
import { Userv2Controller } from './userv2.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [Userv2Service, PrismaService, JwtService],
  controllers: [Userv2Controller],
})
export class Userv2Module {}
