import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

interface ICreateTemplateVariant {
    idTemplateGroup : number;
    name : string;
    kind : string;
    config : string;
}

interface ICreateTemplateGroup {
    kind : string;
}

@Injectable()
export class ConfigTemplateService {
    constructor(
        private prisma: PrismaService
    ){}

    public getTemplateVariantWtId = async (id : number) => {
        let templateVariant = await this.prisma.templateVariant.findUnique({
            where : {id},
            include : {templateGroup : true}});
    
        if (!templateVariant) throw new HttpException('Section not found', HttpStatus.NOT_FOUND);

        return templateVariant;
    }

    public getTemplateGroupWtId = async (id : number) => {
        let templateGroup = await this.prisma.templateGroup.findUniqueOrThrow({
            where : {id}
        })

        return templateGroup;
    }

    public getTemplateVariantAll = async () => {
        let templateVariant = await this.prisma.templateVariant.findMany({include : {templateGroup : true}});
        return templateVariant;
    }

    public getTemplateGroupAll = async () => {
        let templateGroup = await this.prisma.templateGroup.findMany();
        return templateGroup;
    }

    public createTemplateGroup = async (props : ICreateTemplateGroup) => {
        // kind should be unique
        let groupExistOrNot = await this.prisma.templateGroup.findFirst({where : { kind : props.kind}});
    
        if (groupExistOrNot?.id) throw new HttpException('Allready exist', HttpStatus.NOT_FOUND);
    
        let data = await this.prisma.templateGroup.create({data : {
            kind : props.kind}
        });

        return data;
    }

    public createTemplateVariant = async (props : ICreateTemplateVariant) => {
        // find template group
        let templateGroup = await this.prisma.templateGroup.findUnique({where : {id : props.idTemplateGroup}});

        if (!templateGroup?.id) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

        let data = await this.prisma.templateVariant.create({data : {
            name : props.name,
            kind : props.kind,
            config : props.config,
            templateGroupId : templateGroup.id
        }})

        return data;
    }
}
