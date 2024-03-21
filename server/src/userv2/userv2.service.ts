import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/userv2.dto';
import { hash, compareSync } from 'bcrypt';

@Injectable()
export class Userv2Service {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateUserDto) {
    //this.prisma.user.create();
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('email duplicated');

    let passwordHash = await hash(dto.password, 10);
    console.log("PASSWORDDDD")
    console.log(`${dto.password} ->${passwordHash}`);

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: passwordHash, // hash
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    //  if (!email) throw new HttpException('No email', HttpStatus.NOT_FOUND)

    let dataUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    //if (!dataUser) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return dataUser;
  }

  async findByEmailAndPass(props: { email: string, password: string }) {
    console.log("findByEmailAndPass")

    let targetUser = await this.findByEmail(props.email);

    if (!targetUser)
      throw new HttpException("error user not found", HttpStatus.NOT_FOUND);

    console.log("find PASSWORDDDD")

    let result = compareSync(props.password, targetUser.password);

    if (!result)
      throw new HttpException("error user bad password", HttpStatus.UNAUTHORIZED);

    return { ...targetUser };
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateToken(props: {
    id: number,
    accessToken: string,
    refreshToken: string
  }) {
    return await this.prisma.user.update({
      where: { id: props.id },
      data: {
        accessToken: props.accessToken,
        refreshToken: props.refreshToken
      }
    })
  }
}