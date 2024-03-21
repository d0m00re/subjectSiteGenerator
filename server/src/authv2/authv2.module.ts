import { Module } from '@nestjs/common';
import { Authv2Controller } from './authv2.controller';
import { Authv2Service } from './authv2.service';
import { Userv2Service } from 'src/userv2/userv2.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [Authv2Controller],
  providers: [Authv2Service, Userv2Service, JwtService, PrismaService]
})
export class Authv2Module {}
