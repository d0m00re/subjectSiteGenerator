import { Body, Controller, Post } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenAIService) {}

    @Post()
    async createMessage(@Body() data: { message: string }) {
      // Custom context or instruction for the model
      const context = 'Your custom context or instruction here';
      return this.openaiService.createCompletion(data.message, context);
    }
}
