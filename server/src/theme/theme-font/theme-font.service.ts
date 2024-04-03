import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { PrismaService } from 'src/prisma.service';
import { Userv2Service } from 'src/userv2/userv2.service';

interface ICreateOne {
    fontName: string;
    placeholder: string;
}

interface IDeleteOne {
    id: number;
}

interface IGetWithId {
    id: number;
}

@Injectable()
export class ThemeFontService {
    constructor(
        private prisma: PrismaService,
        private configTemplateService: ConfigTemplateService,
        private userv2Service: Userv2Service
    ) { }

    createOne = async (props: ICreateOne) => {
        let data = await this.prisma.themeFont.create({
            data: {
                fontName: props.fontName,
                placeholder: props.placeholder
            }
        });

        return data;
    }

    getAll = async () => {
        let data = await this.prisma.themeFont.findMany({});
        return data;
    }

    deleteOne = async (props: IDeleteOne) => {
        try {
            let data = await this.prisma.themeFont.delete({
                where: {
                    id: props.id
                }
            })
            return data;

        }
        catch(err) {
            throw new HttpException("bad", HttpStatus.NOT_FOUND)
        }
    }

    getWithid = async (props: IGetWithId) => {
        let data = await this.prisma.themeFont.findUnique({
            where: { id: props.id }
        });

        return data;
    }
}
