import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseFloatPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './services/users/users.service';
import { ValidateCreateUserPipe } from './pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard) // work for every routes users
export class UsersController {
  // inject dependencies
  constructor(private userService: UsersService) {}


  @Get()
  getUsersWtQuery(@Query('sortASC', ParseBoolPipe) sortASC: boolean) {
    //return { username : "jack", email : "andd@gmail.com", sort : sortASC}
    return this.userService.fetchUsers();
  }

  @Get('posts')
  getUsersPosts() {
    return [
      { username: 'jack', email: 'andd@gmail.com' },
      { username: 'john', email: 'andd@gmail.com' },
      { username: 'rarararaar', email: 'andd@gmail.com' },
    ];
  }

  @Post()
  createUser(@Req() request: Request, @Res() response: Response) {
    response.send(request.body);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser2(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    this.userService.createUser(userData);
    return userData;
  }

  @Get(':id')
  getUserById(@Param('id', ParseFloatPipe) id: number) {
    const user = this.userService.getUserById(id);

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return user;
  }
}