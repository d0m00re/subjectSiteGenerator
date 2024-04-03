import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Userv2Service } from 'src/userv2/userv2.service';

interface ICreateOne {
    subject: string;
    title: string;
    email: string;
}

interface IGetUserWebsite {
    email: string;
    page: number;
    pageSize: number;
}

interface IDeleteSection {
    email: string;
    sectionId: number
}

interface IMooveSection {
    email: string;
    sectionId: number;
    dir: "top" | "bottom",
}

@Injectable()
export class SiteGeneratorService {
    constructor(
        private prisma: PrismaService,
        private userV2Service : Userv2Service
    ) { }

    deleteSection = async (props: IDeleteSection) => {
        console.log(`delete section id : ${props.sectionId}`);
        // delete section with order and decr all element up
        //const user = await this.userV2Service.getUser(props.email);

        // get current seciton info
        let sectionToDelete = await this.prisma.websiteSection.findUnique({
            where: { id: props.sectionId },
            include: { websiteSectionOrder: true }
        });

        // section not found
        if (!sectionToDelete) throw new HttpException('Section not found', HttpStatus.NOT_FOUND);


        // delete section
        let data = await this.prisma.websiteSection.delete({
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
        //const user = await this.userV2Service.getUser(props.email);

        // get current seciton info
        let currentSection = await this.prisma.websiteSection.findUnique({
            where: { id: props.sectionId },
            include: { websiteSectionOrder: true }
        });

        // 
        let currentOrder = currentSection.websiteSectionOrder.order;
        let targetOrder = currentSection.websiteSectionOrder.order + ((props.dir === "top") ? -1 : 1);

        let targetSection = await this.prisma.websiteSection.findFirst({
            where: {
                websiteId: currentSection.websiteId,
                websiteSectionOrder: {
                    order: targetOrder
                }
            },
            include: { websiteSectionOrder: true }
        });

        // change order
        let arrProm = [
            this.prisma.websiteSectionOrder.update({
                where: { id: currentSection.websiteSectionOrder.id },
                data: { order: targetOrder }
            }),
            this.prisma.websiteSectionOrder.update({
                where: { id: targetSection.websiteSectionOrder.id },
                data: { order: currentOrder }
            })
        ];

        let result = await Promise.all(arrProm);

        return result;
        // go switch order

        //  if (currentOrder < 0 || targetOrder < 0) throw new HttpException('Section not found', HttpStatus.FORBIDDEN);
    }

    // old ia generation
    createOneV2 = async (props: ICreateOne) => {
       // let user = await this.userV2Service.findByEmail(props.email);

        /*
          // Fetch the existing sections count for the website
          const existingSectionsCount = await prisma.section.count({ where: { websiteId } });
        */
        // generate subsection
        /*
        let sectionGenerate = await this.openAiService.createCompletion({
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
                    configTemplateId: 1,
                    websiteSectionOrder: {
                        create: {
                            order: index,
                            websiteId: websiteCreate.id,

                        }
                    },

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
        */
    }

    duplicateSection = async (props: { sectionId: number, email: string }) => {
        let user = await this.userV2Service.findByEmail(props.email);

        // get target section  with order
        let websiteSection = await this.prisma.websiteSection.findUnique({
            where: { id: props.sectionId },
            include: { websiteSectionOrder: true }
        });

        if (!websiteSection) throw new HttpException('Section not found', HttpStatus.NOT_FOUND);

        // check auth
        // ....
        // increment order
        await this.prisma.websiteSectionOrder.updateMany({
            where: {
                websiteId: websiteSection.websiteId,
                order: { gt: websiteSection.websiteSectionOrder.order }
            },
            data: {
                order: {
                    increment: 2
                }
            }
        })

        // create section
        await this.prisma.websiteSection.create({
            data: {
                websiteId: websiteSection.websiteId,
                backgroundImage: "unimplemented",
                backgroundColor : "unimplemented",
                configTemplateId: 1,
                themePaletteOrder : 0,
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
        let user = await this.userV2Service.findByEmail(props.email);

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
}
