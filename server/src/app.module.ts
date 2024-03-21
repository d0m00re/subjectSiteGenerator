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
import { WebsiteModule } from './website/website.module';
import { FilesModule } from './files/files.module';
import { Authv2Module } from './authv2/authv2.module';

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
    WebsiteModule,
    FilesModule,
    Authv2Module,
  ],
  controllers: [],
  providers: [PrismaService, JwtService, OpenaiModule],
})
export class AppModule {}
