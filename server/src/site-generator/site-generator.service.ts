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

interface ICreateNewSection {
    email : string;
    order : number;
    websiteId : number;
    title : string;
    description : string;
}

@Injectable()
export class SiteGeneratorService {
    constructor(
        private prisma: PrismaService,
        private openAi: OpenAIService
    ) {}

    private getUser = async (email : string) => {
        const user = await this.prisma.user.findFirst({
            where : {email}
        })

        if (!user) {
            throw new HttpException('No authroization', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
    // should control user
    updateSection = async (props : IUpdateSection) => {
        const user = await this.getUser(props.email);

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
    // probably should rework data model for reduce amount or data load perform
    createNewSection = async (props : ICreateNewSection) => {
        const user = await this.getUser(props.email);

        let currentOrder = props.order;

        /*
                // Increment the order of SectionOrders starting from the new position
                await prisma.sectionOrder.updateMany({
                where: {
                    order: { gte: newPosition },
                },
                data: {
                    order: {
                        increment: 1,
                    },
                },
            });
        */
        // reorder section
        let allWebsiteSection = await this.prisma.websiteSection.findMany({
            where : {
                websiteId : props.websiteId,
                
            },
            include : {
                websiteSectionOrder : true
            }
        })
        // create subsection

        // reorder and update
    }

    createOneV2 = async (props : ICreateOne) => {
        let user = await this.getUser(props.email);

        /*
          // Fetch the existing sections count for the website
          const existingSectionsCount = await prisma.section.count({ where: { websiteId } });
        */
        // generate subsection
        let sectionGenerate = await this.openAi.createCompletion({
            title : props.title,
            subject : props.subject,
        });

        const promiseArr = [];

        // create website
        let websiteCreate = await this.prisma.website.create({
            data : {
                title : props.subject,
                subject : props.subject,
                userId : user.id
            }
        })

        // create section
        sectionGenerate.forEach((sectionElem, index) => {
            const order = index;
            const sectionPromise = this.prisma.websiteSection.create({
                data: {
                    ...sectionElem,
                    websiteId : websiteCreate.id,
                    websiteSectionOrder : {
                         create : {
                            order : index,
                            websiteId : websiteCreate.id
                        }
                    }
                }
            });
            promiseArr.push(sectionPromise);
        })

        // consume all promise
        console.log("consume promise : ")
        const createdSectionOrder =  await Promise.all(promiseArr);

        // tmp - re get the website and return with section order
        return await this.prisma.website.findUnique({
            where : {id : websiteCreate.id},
            include : {
                websiteSection : {
                    include : { websiteSectionOrder : true}
                }
            }
        })


        return createdSectionOrder;
    }

    getUserWebsite = async (props : IGetUserWebsite) => {
        // find user
        let user = await this.getUser(props.email);

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

    getWebsiteWtId = async(id : number) => {
        return this.prisma.website.findUnique({
            where : {id : id},
            include : {websiteSection : {
                include : {
                    websiteSectionOrder : true
                }
            }}
        })
    }
}
