import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as dto from "./dto/generate.dto"

interface ICreateOne {
    subject: string;
    title : string;
    email : string;
}

interface IGetUserWebsite {
    email : string;
    page : number;
    pageSize : number;
}

@Injectable()
export class SiteGeneratorService {
    constructor(private prisma: PrismaService) {}

    createOne = async (props : ICreateOne) => {
        // check if user exist or not

        // find user
        const user = await this.prisma.user.findFirst({
            where : {email : props.email}
        })

        if (!user) {
            throw new HttpException('No authroization', HttpStatus.UNAUTHORIZED);
        }

        return await this.prisma.website.create({
            data : {
                title : props.subject,
                subject : props.subject,
                userId : user.id
            }
        })
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
}
