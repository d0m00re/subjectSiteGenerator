import { Module } from '@nestjs/common';
import { ThemePaletteController } from './theme-palette.controller';
import { ThemePaletteService } from './theme-palette.service';

@Module({
  controllers: [ThemePaletteController],
  providers: [ThemePaletteService]
})
export class ThemePaletteModule {}
