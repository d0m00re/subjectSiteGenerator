import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { Userv2Module } from './userv2/userv2.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { SiteGeneratorController } from './site-generator/site-generator.controller';
import { SiteGeneratorModule } from './site-generator/site-generator.module';
import { JwtService } from '@nestjs/jwt';
import { OpenaiModule } from './openai/openai.module';
import { ConfigTemplateModule } from './config-template/config-template.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Userv2Module,
    AuthModule,
    SiteGeneratorModule,
    OpenaiModule,
    ConfigTemplateModule,
  ],
  controllers: [],
  providers: [PrismaService, JwtService, OpenaiModule],
})
export class AppModule {}
