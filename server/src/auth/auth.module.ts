import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Userv2Service } from 'src/userv2/userv2.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [],//[JwtModule.register({secret : process.env.JWT_SECRET_KEY})],
  controllers: [AuthController],
  providers: [AuthService, Userv2Service, PrismaService, JwtService]//JwtService
})
export class AuthModule {}
