import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Userv2Service } from './userv2.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('userv2')
export class Userv2Controller {
  constructor(private userService: Userv2Service) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }
}
