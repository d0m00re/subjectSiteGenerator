import { Module } from '@nestjs/common';
import { ThemeGroupController } from './theme-group.controller';
import { ThemeGroupService } from './theme-group.service';

@Module({
  controllers: [ThemeGroupController],
  providers: [ThemeGroupService]
})
export class ThemeGroupModule {}
