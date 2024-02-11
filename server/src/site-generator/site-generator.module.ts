import { Module } from '@nestjs/common';
import { SiteGeneratorController } from './site-generator.controller';
import { SiteGeneratorService } from './site-generator.service';

@Module({
  controllers: [SiteGeneratorController],
  providers: [SiteGeneratorService]
})
export class SiteGeneratorModule {}
