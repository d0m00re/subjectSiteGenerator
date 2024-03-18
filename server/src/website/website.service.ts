import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IButtonRow, IDataUpdateElem, ITypographyRow, parseTemplateConfigStringToJSON } from './utils/parserConfig';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { Userv2Service } from 'src/userv2/userv2.service';

interface IUpdateSectionV2 {
    userId: number;
    data: any;
    sectionId: number;
}

interface ICreateNewSectionV3 {
    userId: number;
    data: IDataUpdateElem[];//{ [key: string]: IDataUpdateElem }; // json object
    order: number;
    websiteId: number;
    templateId: number;
}

/**
 * prepare v3 update / create
 */
export interface IUpdateV3 {
    data: { [key: string]: IDataUpdateElem }; // json object
    sectionId: number;
    userId: number;
}

export interface IUpdateV4 {
    data: IDataUpdateElem[];
    layout: any;
    sectionId: number;
    userId: number;
}

//-----------------------------------

@Injectable()
export class WebsiteService {
    constructor(
        private prisma: PrismaService,
        private configTemplateService: ConfigTemplateService,
        private userv2Service: Userv2Service
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

        let arrProm: any = []

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
                        where: { id: currentElem.id },
                        data: { text: currentElem.text }
                    }));
                }
            }
            else if (keyTarget === "button") {
                let currentElem = sectionWithSubElem.buttons.find(e => e.order === configJSON[i].order);
                if (currentElem) {
                    currentElem.text = props.data[configJSON[i].label];
                    arrProm.push(this.prisma.templateElemButton.update({
                        where: { id: currentElem.id },
                        data: { text: currentElem.text }
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
 
    createNewSectionV4 = async (props: ICreateNewSectionV3) => {
        //const user = await this.userv2Service.findById(props.userId);
        console.log("create new section v3")
        let currentOrder = props.order;

        // get template target
        const template = await this.configTemplateService.getTemplateVariantWtId(props.templateId); //this.prisma.templateVariant.findUnique({where : {id : props.templateId}});

        if (!template) throw new HttpException('No template variant found', HttpStatus.NOT_FOUND);

        const configJSON = parseTemplateConfigStringToJSON(template.config);

        // cxheck if all key are present inside data
        // basic validation for the moment rework with a better version later
        let button: IButtonRow[] = [];
        let typography: ITypographyRow[] = [];
        for (let i = 0; i < props.data.length; i++) {
            let currentElem = props.data[i];
            let templateElem = configJSON.find(e => e.order === currentElem.order);
            if (currentElem.kind === "typography" && templateElem.kind === "text" && currentElem.order === templateElem.order) {
                // get templat elem
                typography.push({
                    order: templateElem.order ?? -1,
                    text: currentElem.text,
                    size: currentElem.size,
                    variant: currentElem.variant,
                    path: currentElem.path,
                    animation: currentElem.animation,
                    decorator: currentElem.decorator
                })              
            } else if (currentElem.kind === "button" && templateElem.kind === "button" && currentElem.order === templateElem.order) {
                button.push({
                    order: templateElem.order ?? -1,
                    text: currentElem.text,
                    size: currentElem.size,
                    variant: currentElem.variant,
                    shape: currentElem.shape,
                    actionType: currentElem.actionType,
                    path: currentElem.path,
                    animation: currentElem.animation
                })
            }
        }

        // moove all section order for our new section order
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

        await this.prisma.websiteSection.create({
            data: {
                websiteId: props.websiteId,
                backgroundImage: "unimplemented",
                backgroundColor: "unimplemented",
                configTemplateId: props.templateId,
                websiteSectionOrder: {
                    create: {
                        websiteId: props.websiteId,
                        order: props.order
                    }
                },
                buttons: {
                    create: button
                },
                typographies: {
                    create: typography
                }
            }
        });

        let newData = await this.getWebsiteFull({ websiteId: props.websiteId });
        return newData;
    }

    sectionUpdateV4 = async (props: IUpdateV4) => {
        // check user identity

        let section = await this.prisma.websiteSection.findUnique({
            where: {
                id: props.sectionId
            },
            include: {
                typographies: true,
                buttons: true
            }
        });

        if (!section)
            throw new HttpException("section not found", HttpStatus.NOT_FOUND);

        // format data
        for (let i = 0; i < props.data.length; i++) {
            let elem = props.data[i];
            if (elem.kind === "typography") {
                let indexTypo = section.typographies.findIndex(e => e.order === elem.order);
                if (indexTypo !== -1) {
                    section.typographies[indexTypo].text = elem.text;
                    section.typographies[indexTypo].size = elem.size;
                    section.typographies[indexTypo].variant = elem.variant;
                }
            }
            else if (elem.kind === "button") {
                let indexButton = section.buttons.findIndex(e => e.order === elem.order);
                if (indexButton !== -1) {
                    section.buttons[indexButton].text = elem.text;
                    section.buttons[indexButton].size = elem.size;
                    section.buttons[indexButton].variant = elem.variant;
                }
            }
        }

        // button
        let buttons = props.data.filter(e => e.kind === "button");
        let typography = props.data.filter(e => e.kind === "typography");
        // typograpgy

        let dataUpdate = await this.prisma.websiteSection.update({
            where: { id: props.sectionId },
            include : {
                buttons : true,
                typographies : true,
                websiteSectionOrder : true
            },
            data: {
                buttons: {
                    updateMany: [
                        ...buttons.map(b => ({
                            where: { order: b.order },
                            data: {
                                text: b.text,
                                size: b.size,
                                variant: b.variant
                            }
                        }))
                    ],
                },
                typographies: {
                    updateMany: [
                        ...typography.map(t => ({
                            where: { order: t.order },
                            data: {
                                text: t.text,
                                size: t.size,
                                variant: t.variant
                            }
                        }))
                    ]
                }
            },
        });

        return dataUpdate;
    }
}

