import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as dto from "./dto/generate.dto"
import { OpenAIService } from 'src/openai/openai.service';

interface ICreateOne {
    subject: string;
    title : string;
    email : string;
}

interface IUpdateSection {
    sectionId : number;
    title : string;
    description : string;

    email : string; // email user
}

interface IGetUserWebsite {
    email : string;
    page : number;
    pageSize : number;
}

@Injectable()
export class SiteGeneratorService {
    constructor(
        private prisma: PrismaService,
        private openAi: OpenAIService
    ) {}

    updateSection = async (props : IUpdateSection) => {
        const user = await this.prisma.user.findFirst({
            where : {email : props.email}
        });

        if (!user) {
            throw new HttpException('No authroization', HttpStatus.UNAUTHORIZED);
        }

        // retrieve website and associate section
        
        let websiteWtSection = await this.prisma.websiteSection.findFirst({
            where : {id : props.sectionId},
        });

        if (!websiteWtSection)
            throw new HttpException('No section found', HttpStatus.NOT_FOUND);

        let website = await this.prisma.website.findFirst({
            where : {id : websiteWtSection.websiteId}
        });

        if (!website)
            throw new HttpException('No website found', HttpStatus.NOT_FOUND);

        //---------------- update
        let res = await this.prisma.websiteSection.update({
            where : {id : websiteWtSection.id},
            data : {
                title : props.title,
                description : props.description
            }
        });
        return res;
    }

    createOne = async (props : ICreateOne) => {
        // check if user exist or not

        // find user
        const user = await this.prisma.user.findFirst({
            where : {email : props.email}
        })

        if (!user) {
            throw new HttpException('No authroization', HttpStatus.UNAUTHORIZED);
        }

        // generate subsection
        let sectionGenerate = await this.openAi.createCompletion({
            title : props.title,
            subject : props.subject
        });

        let data = await this.prisma.website.create({
            data : {
                title : props.subject,
                subject : props.subject,
                userId : user.id,
                websiteSection : {
                    create : sectionGenerate
                }
                //websiteSection : sectionGenerate
            }
        })

        return data;
    }

    getUserWebsite = async (props : IGetUserWebsite) => {
        // find user
        const user = await this.prisma.user.findFirst({
            where : {email : props.email}
        })

        if (!user) {
            throw new HttpException('No authroization', HttpStatus.UNAUTHORIZED);
        }

        // get count elem
        const websiteCount = await this.prisma.website.count({
            where : { userId : user.id}
        })

        let myWebsiteList =  await this.prisma.website.findMany({
            where : {
                userId : user.id,
            },
            take : props.pageSize,
            skip : props.page * props.pageSize
        })

        return {
            rows : myWebsiteList,
            info : { 
                count : websiteCount,
                page : props.page,
                pageSize : props.pageSize
            }
        }
    }

    generateAWebsite = async () => {

    }

    getWebsiteWtId = async(id : number) => {
        return this.prisma.website.findUnique({
            where : {id : id},
            include : {websiteSection : true}
        })
    }
}
