import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { parseTemplateConfigStringToJSON } from './utils/parserConfig';

interface IGetUserWebsite {
    //web: string;
    page: number;
    pageSize: number;
}

interface IUpdateSectionV2 {
    userId: number;
    data: any;
    sectionId: number;
}

/**
 * prepare v3 update / create
 */
interface IUpdateTypography {
    kind : "typography"
    order : number;

    text : string;
    size : string;
    variant : string;
    path : string;
    animation : string;
    decorator : string;
}

interface IUpdateButton {
    kind : "button",
    order : number;

    text : string;
    size : string;
    variant : string;
    shape : string;
    actionType : string;
    path : string;
    animation : string;
}

interface IUpdateV3 {
    data : (IUpdateTypography | IUpdateButton)[],
    sectionId : number;
    userId : number;
}

//-----------------------------------

@Injectable()
export class WebsiteService {
    constructor(
        private prisma: PrismaService,
    ) { }

    create = async (props: { userId: number, title: string; subject: string }) => {
        let newWebsite = await this.prisma.website.create({
            data: {
                userId: props.userId,
                title: props.title,
                subject: props.subject
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

    updateSectionV2 = async (props: IUpdateSectionV2) => {
        // get back section
        let sectionWithSubElem = await this.prisma.websiteSection.findUnique({
            where: { id: props.sectionId },
            include: {
                websiteSectionOrder: true,
                configTemplate: true,
                buttons: true,
                typographies: true,
                images: true
            }
        });

        if (!sectionWithSubElem) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

        const configJSON = parseTemplateConfigStringToJSON(sectionWithSubElem.configTemplate.config);

        let arrProm : any = []

        for (let i = 0; i < configJSON.length; i++) {
            // key tagret
            let keyTarget = configJSON[i].kind;

            if (keyTarget === "text") {
                // get current text elements
                let currentElem = sectionWithSubElem.typographies.find(e => e.order === configJSON[i].order);
                if (currentElem) {
                    // update text
                    currentElem.text = props.data[configJSON[i].label];
                    arrProm.push(this.prisma.templateElemTypography.update({
                        where : { id : currentElem.id},
                        data : {text : currentElem.text}
                    }));
                }
            }
            else if (keyTarget === "button") {
                let currentElem = sectionWithSubElem.buttons.find(e => e.order === configJSON[i].order);
                if (currentElem) {
                    currentElem.text = props.data[configJSON[i].label];
                    arrProm.push(this.prisma.templateElemButton.update({
                        where : { id : currentElem.id},
                        data : {text : currentElem.text}
                    }));
                }
            }
        }

        await Promise.all(arrProm);

        let retData = await this.prisma.websiteSection.findUnique({
            where: { id: props.sectionId },
            include: {
                websiteSectionOrder: true,
                configTemplate: true,
                buttons: true,
                typographies: true,
                images: true
            }
        });

        return retData;
    }

    sectionUpdateV3 = async (props : IUpdateV3) => {
        console.log("update v3 let s go man");
        console.log(props);
                // get back section
                let sectionWithSubElem = await this.prisma.websiteSection.findUnique({
                    where: { id: props.sectionId },
                    include: {
                        websiteSectionOrder: true,
                        configTemplate: true,
                        buttons: true,
                        typographies: true,
                        images: true
                    }
                });
        
                if (!sectionWithSubElem) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        
                const configJSON = parseTemplateConfigStringToJSON(sectionWithSubElem.configTemplate.config);
        
                let arrProm : any = []
        
                for (let i = 0; i < configJSON.length; i++) {
                    // key tagret
                    let keyTarget = configJSON[i].kind;
        
                    if (keyTarget === "text") {
                        // get current text elements
                        let currentElem = sectionWithSubElem.typographies.find(e => e.order === configJSON[i].order);
                        if (currentElem) {
                            // update text
                            currentElem.text = props.data[configJSON[i].label];
                            arrProm.push(this.prisma.templateElemTypography.update({
                                where : { id : currentElem.id},
                                data : {
                                    text : currentElem.text,
                                    size : currentElem.size,
                                    variant : currentElem.variant,
                                    path : currentElem.path,
                                    animation : currentElem.animation,
                                    decorator : currentElem.decorator
                                }
                            }));
                        }
                    }
                    else if (keyTarget === "button") {
                        let currentElem = sectionWithSubElem.buttons.find(e => e.order === configJSON[i].order);
                        if (currentElem) {
                            currentElem.text = props.data[configJSON[i].label];
                            arrProm.push(this.prisma.templateElemButton.update({
                                where : { id : currentElem.id},
                                data : {
                                    text : currentElem.text,
                                    size : currentElem.size,
                                    variant : currentElem.variant,
                                    shape : currentElem.shape,
                                    actionType : currentElem.actionType,
                                    path : currentElem.path,
                                    animation : currentElem.animation
                                }
                            }));
                        }
                    }
                }
        
                await Promise.all(arrProm);
        
                let retData = await this.prisma.websiteSection.findUnique({
                    where: { id: props.sectionId },
                    include: {
                        websiteSectionOrder: true,
                        configTemplate: true,
                        buttons: true,
                        typographies: true,
                        images: true
                    }
                });
        
                return retData;
        return {unimplemented : true}
    }
}

