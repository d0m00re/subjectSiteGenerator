import { Controller } from '@nestjs/common';
import { ThemePaletteElemService } from './theme-palette-elem.service';

@Controller('theme-palette-elem')
export class ThemePaletteElemController {
    constructor(
        private themePaletteElemService: ThemePaletteElemService
      ) { }
}
