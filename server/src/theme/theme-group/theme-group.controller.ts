import { Controller } from '@nestjs/common';
import { ThemeGroupService } from './theme-group.service';

@Controller('theme-group')
export class ThemeGroupController {
    constructor(
        private themeGroupService: ThemeGroupService
      ) { }
}
