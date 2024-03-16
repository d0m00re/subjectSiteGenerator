import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    userId : number;
    data: {[key : string] : IDataUpdateElem}; // json object
    order: number;
    websiteId: number;
    templateId: number;
}

/**
 * prepare v3 update / create
 */
export interface IUpdateV3 {
    data: {[key : string] : IDataUpdateElem}; // json object
    sectionId : number;
    userId : number;
}

//-----------------------------------

@Injectable()
export class WebsiteService {
    constructor(
        private prisma: PrismaService,
        private configTemplateService: ConfigTemplateService,
        private userv2Service : Userv2Service
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

    createNewSectionV3 = async (props: ICreateNewSectionV3) => {
        //const user = await this.userv2Service.findById(props.userId);

        let currentOrder = props.order;

        // get template target
        const template = await this.configTemplateService.getTemplateVariantWtId(props.templateId); //this.prisma.templateVariant.findUnique({where : {id : props.templateId}});

        if (!template) throw new HttpException('No template variant found', HttpStatus.NOT_FOUND);

        const configJSON = parseTemplateConfigStringToJSON(template.config);

        // cxheck if all key are present inside data
        // basic validation for the moment rework with a better version later
        let validateDataInput = true;
        let msgErrorDetail : any = {}
        for (let i = 0; i < configJSON.length; i++) {
            if (!props.data[configJSON[i].label]) {
                msgErrorDetail[configJSON[i].label] = "key missing";
                validateDataInput = false;
            }
        }
        if (!validateDataInput) throw new HttpException(`Some data not found : ${JSON.stringify(msgErrorDetail)}`, HttpStatus.NOT_FOUND);

        // encode data
        let button: IButtonRow[] = [];
        let typography: ITypographyRow[] = [];

        // transform config to real elements
        for (let i = 0; i < configJSON.length; i++) {
            let configElem = configJSON[i];
            // get back property text
            let elem = props.data[configElem.label];
            if (configElem.kind === "text" && elem.kind === "typography") {
                typography.push({
                    order: configElem.order ?? -1,
                    text: elem.text,
                    size : elem.size,
                    variant : elem.variant,
                    path: elem.path,
                    animation : elem.animation,
                    decorator : elem.decorator
                })
            } else if (configElem.kind === "button" && elem.kind === "button") {
                button.push({
                    order: configElem.order ?? -1,
                    text: elem.text,
                    size : elem.size,
                    variant : elem.variant,
                    shape : elem.shape,
                    actionType : elem.actionType,
                    path: elem.path,
                    animation: elem.animation
                })
            }
        }
        //-----------------------------------------------

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

        let data = await this.prisma.websiteSection.create({
            data: {
                websiteId: props.websiteId,
                backgroundImage: "unimplemented",
                backgroundColor : "unimplemented",
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

        // retrieve all data and return it :
        let newData = await this.getWebsiteFull({ websiteId: props.websiteId });
        return newData;
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
                            //currentElem.text = props.data[configJSON[i].label];
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
                           // currentElem.text = props.data[configJSON[i].label];
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

