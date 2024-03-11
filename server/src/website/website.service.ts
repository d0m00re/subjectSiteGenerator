import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

interface IGetUserWebsite {
    //web: string;
    page: number;
    pageSize: number;
}

@Injectable()
export class WebsiteService {
    constructor(
        private prisma: PrismaService,
    ) { }

    create = async (props : {userId : number, title : string; subject : string} ) => {
        let newWebsite = await this.prisma.website.create({
            data : {
                userId : props.userId,
                title : props.title,
                subject : props.subject
            }
        })

        return newWebsite;
    }

    getWebsiteFull = async (props: { websiteId: number }) => {
        let website = await this.prisma.website.findUnique({
            where: { id: props.websiteId },
            include: {
                websiteSection: {
                    include: {
                        websiteSectionOrder: true,
                        buttons: true,
                        typographies: true,
                        //  configTemplate : true
                    }
                }
            }
        });
        if (!website) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        return website;
    }

    /*
    getWebsitePaginate = async (props: IGetUserWebsite) => {
        // find user
       // let user = await this.getUser(props.email);

        // get count elem
        const websiteCount = await this.prisma.website.count({
            where: { userId: user.id }
        })

        let myWebsiteList = await this.prisma.website.findMany({
            where: {
                userId: user.id,
            },
            take: props.pageSize,
            skip: props.page * props.pageSize
        })

        return {
            rows: myWebsiteList,
            info: {
                count: websiteCount,
                page: props.page,
                pageSize: props.pageSize
            }
        }
    }
    */
}
