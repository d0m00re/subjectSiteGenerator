import { Controller } from '@nestjs/common';
import { ThemePaletteService } from './theme-palette.service';

@Controller('theme-palette')
export class ThemePaletteController {
    constructor(
        private themePaletteService: ThemePaletteService
      ) { }
}
