import { Controller } from '@nestjs/common';
import { ThemeButtonService } from './theme-button.service';

@Controller('theme-button')
export class ThemeButtonController {
    constructor(
        private themeButton: ThemeButtonService
    ){
        
    }


}
