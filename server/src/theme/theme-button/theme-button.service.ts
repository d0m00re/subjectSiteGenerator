import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ThemeButtonService {
    constructor(
        private prisma: PrismaService,
    ){}
}
