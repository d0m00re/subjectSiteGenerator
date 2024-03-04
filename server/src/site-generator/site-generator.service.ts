import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as dto from "./dto/generate.dto"
import { OpenAIService } from 'src/openai/openai.service';

interface ICreateOne {
    subject: string;
    title: string;
    email: string;
}

interface IUpdateSection {
    sectionId: number;
    title: string;
    description: string;

    email: string; // email user
}

interface IGetUserWebsite {
    email: string;
    page: number;
    pageSize: number;
}

interface ICreateNewSection {
    email: string;
    order: number;
    websiteId: number;
    title: string;
    description: string;
}

interface IDeleteSection {
    email: string;
    sectionId: number
}

interface IMooveSection {
    email : string;
    sectionId : number;
    dir: "top" | "bottom",
}

@Injectable()
export class SiteGeneratorService {
    constructor(
        private prisma: PrismaService,
        private openAi: OpenAIService
    ) { }

    private getUser = async (email: string) => {
        const user = await this.prisma.user.findFirst({
            where: { email }
        })

        if (!user) {
            throw new HttpException('No authroization', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
    // should control user
    updateSection = async (props: IUpdateSection) => {
        const user = await this.getUser(props.email);

        // retrieve website and associate section

        let websiteWtSection = await this.prisma.websiteSection.findFirst({
            where: { id: props.sectionId },
        });

        if (!websiteWtSection)
            throw new HttpException('No section found', HttpStatus.NOT_FOUND);

        let website = await this.prisma.website.findFirst({
            where: { id: websiteWtSection.websiteId }
        });

        if (!website)
            throw new HttpException('No website found', HttpStatus.NOT_FOUND);

        //---------------- update
        let res = await this.prisma.websiteSection.update({
            where: { id: websiteWtSection.id },
            data: {
                title: props.title,
                description: props.description
            }
        });
        return res;
    }
    // probably should rework data model for reduce amount or data load perform
    createNewSection = async (props: ICreateNewSection) => {
        const user = await this.getUser(props.email);

        let currentOrder = props.order;

        // reorder section
        await this.prisma.websiteSectionOrder.updateMany({
            where: {
                websiteId: props.websiteId,
                order: { gte: currentOrder } // greater than or egual
            },
            data: {
                order: {
                    increment: 1
                }
            }
        });

        // create subsection
        await this.prisma.websiteSection.create({
            data: {
                kind: "subSection",
                title: props.title,
                description: props.description,
                websiteId: props.websiteId,
                backgroundImage: "useless",
                websiteSectionOrder: {
                    create: {
                        websiteId: props.websiteId,
                        order: props.order
                    }
                }
            }
        });

        let newData = await this.prisma.website.findUnique({
            where: { id: props.websiteId },
            include: {
                websiteSection: {
                    include: {
                        websiteSectionOrder: true
                    }
                }
            }
        })

        return newData;
        // reorder and update
    }

    deleteSection = async (props: IDeleteSection) => {
        console.log(`delete section id : ${props.sectionId}`);
        // delete section with order and decr all element up
        const user = await this.getUser(props.email);

        // get current seciton info
        let sectionToDelete = await this.prisma.websiteSection.findUnique({
            where: { id: props.sectionId },
            include: { websiteSectionOrder: true }
        });

        // section not found
        if (!sectionToDelete) throw new HttpException('Section not found', HttpStatus.NOT_FOUND);


        // delete section
        await this.prisma.websiteSection.delete({
            where: { id: props.sectionId },
            include: { websiteSectionOrder: true }
        });

        // reorder section order
        // decr all table order > oldOrder
        await this.prisma.websiteSectionOrder.updateMany({
            where: {
                websiteId: sectionToDelete.websiteId,
                order: { gte: sectionToDelete.websiteSectionOrder.order } // greater than or egual
            },
            data: {
                order: {
                    decrement: 1
                }
            }
        });

        return { sectionId: props.sectionId };
    }

    mooveSection = async (props: IMooveSection) => {
        // moove top or bottom
        // if moove bottom :
        //  curr : order - 1
        // element bottom : + 1
        // else if moove top :
        // curr : order + 1
        // element top : - 1 

        console.log(`section to moove id : ${props.sectionId}`);
        // delete section with order and decr all element up
        const user = await this.getUser(props.email);

        // get current seciton info
        let currentSection = await this.prisma.websiteSection.findUnique({
            where: { id: props.sectionId },
            include: { websiteSectionOrder: true }
        });

        // 
        let currentOrder = currentSection.websiteSectionOrder.order;
        let targetOrder = currentSection.websiteSectionOrder.order + ((props.dir === "top") ? -1 : 1);
    
        let targetSection = await this.prisma.websiteSection.findFirst({
            where : {
                websiteId : currentSection.websiteId,
                websiteSectionOrder : {
                    order : targetOrder
                }
            },
            include : {websiteSectionOrder : true}
        });

        // change order
        let arrProm = [
            this.prisma.websiteSectionOrder.update({
                where : {id : currentSection.websiteSectionOrder.id},
                data : {order : targetOrder}
            }),
            this.prisma.websiteSectionOrder.update({
                where : { id : targetSection.websiteSectionOrder.id},
                data : {order : currentOrder}
            })
        ];

        let result = await Promise.all(arrProm);

        return result;
        // go switch order

      //  if (currentOrder < 0 || targetOrder < 0) throw new HttpException('Section not found', HttpStatus.FORBIDDEN);
    }

    createOneV2 = async (props: ICreateOne) => {
        let user = await this.getUser(props.email);

        /*
          // Fetch the existing sections count for the website
          const existingSectionsCount = await prisma.section.count({ where: { websiteId } });
        */
        // generate subsection
        let sectionGenerate = await this.openAi.createCompletion({
            title: props.title,
            subject: props.subject,
        });

        const promiseArr = [];

        // create website
        let websiteCreate = await this.prisma.website.create({
            data: {
                title: props.subject,
                subject: props.subject,
                userId: user.id
            }
        })

        // create section
        sectionGenerate.forEach((sectionElem, index) => {
            const sectionPromise = this.prisma.websiteSection.create({
                data: {
                    ...sectionElem,
                    websiteId: websiteCreate.id,
                    websiteSectionOrder: {
                        create: {
                            order: index,
                            websiteId: websiteCreate.id
                        }
                    }
                }
            });
            promiseArr.push(sectionPromise);
        })

        // consume all promise
        await Promise.all(promiseArr);

        // tmp - re get the website and return with section order
        return await this.prisma.website.findUnique({
            where: { id: websiteCreate.id },
            include: {
                websiteSection: {
                    include: { websiteSectionOrder: true }
                }
            }
        })
    }

    duplicateSection = async (props: {sectionId : number, email : string}) => {
        let user = await this.getUser(props.email);

        // get target section  with order
        let websiteSection = await this.prisma.websiteSection.findUnique({
            where : { id : props.sectionId},
            include : {websiteSectionOrder : true}});
        
        if (!websiteSection) {
            throw new HttpException('Section not found', HttpStatus.NOT_FOUND);
        }

        
        
        // check auth
        // ....

        // increment order
        await this.prisma.websiteSectionOrder.updateMany({
            where : {
                websiteId : websiteSection.websiteId,
                order : {gt : websiteSection.websiteSectionOrder.order}
            },
            data : {
                order : {
                    increment : 2
                }
            }
        })

        // create section
        await this.prisma.websiteSection.create({
            data: {
                kind: "subSection",
                title: websiteSection.title,
                description: websiteSection.description,
                websiteId: websiteSection.websiteId,
                backgroundImage: "useless",
                websiteSectionOrder: {
                    create: {
                        websiteId: websiteSection.websiteId,
                        order: websiteSection.websiteSectionOrder.order + 1
                    }
                }
            }    
        })
        // return all website section
        return this.prisma.website.findUnique({
            where: { id: websiteSection.websiteId },
            include: {
                websiteSection: {
                    include: {
                        websiteSectionOrder: true
                    }
                }
            }
        })
    }

    getUserWebsite = async (props: IGetUserWebsite) => {
        // find user
        let user = await this.getUser(props.email);

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

    getWebsiteWtId = async (id: number) => {
        return this.prisma.website.findUnique({
            where: { id: id },
            include: {
                websiteSection: {
                    include: {
                        websiteSectionOrder: true
                    }
                }
            }
        })
    }
}
