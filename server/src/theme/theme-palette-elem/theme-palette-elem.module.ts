import { Module } from '@nestjs/common';
import { ThemePaletteElemController } from './theme-palette-elem.controller';
import { ThemePaletteElemService } from './theme-palette-elem.service';

@Module({
  controllers: [ThemePaletteElemController],
  providers: [ThemePaletteElemService]
})
export class ThemePaletteElemModule {}
