import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule} from "@nestjs/config";
import { Userv2Module } from './userv2/userv2.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({
    isGlobal: true
  }), Userv2Module, AuthModule],
  controllers: [],
  providers: [PrismaService],
})

export class AppModule {}
