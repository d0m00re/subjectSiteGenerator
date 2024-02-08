import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/userv2.dto';
import { hash } from "bcrypt";
@Injectable()
export class Userv2Service {
    constructor(private prisma : PrismaService) {

    }

    async create(dto: CreateUserDto) {
        //this.prisma.user.create();
        const user = await this.prisma.user.findUnique({
            where : {
                email :dto.email
            }
        });

        if (user) throw new ConflictException("email duplicated")
    
        const newUser = await this.prisma.user.create({
            data : {
                ...dto,
                password : await hash(dto.password, 10) // hash
            }
        });

        const {password, ...result} = newUser;
        return result;
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where : {
                email
            }
        })
    }

    async findById(id: number) {
        return await this.prisma.user.findUnique({
            where : {
                id
            }
        })
    }
}
