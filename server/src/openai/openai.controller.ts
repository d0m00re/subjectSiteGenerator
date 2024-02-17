import { Body, Controller, Post } from '@nestjs/common';
import { ICreateCompletion, OpenAIService } from './openai.service';
import { CreateMessageDto } from './dto/createMessage.dto';

@Controller('openai')
export class OpenaiController {
    constructor(private readonly openaiService: OpenAIService) {}

    @Post()
    async createMessage(@Body() data: CreateMessageDto) {
      // Custom context or instruction for the model
      const context = 'Your custom context or instruction here';
      return this.openaiService.createCompletion(data);
    }
}
