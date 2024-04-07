// todo : rework
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IButtonRow, IImageRow, ITypographyRow, IUpdateButton, IUpdateImg, IUpdateTypography, parseTemplateConfigStringToJSON } from './utils/parserConfig';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { Userv2Service } from 'src/userv2/userv2.service';
import { ICreateNewSectionV3, IUpdateThemeV1, IUpdateV4 } from './website.entity';

@Injectable()
export class WebsiteService {
    constructor(
        private prisma: PrismaService,
        private configTemplateService: ConfigTemplateService,
        private userv2Service: Userv2Service
    ) { }

    create = async (props: { userId: number, title: string; subject: string }) => {
        //
        let newWebsite = await this.prisma.website.create({
            data: {
                userId: props.userId,
                title: props.title,
                subject: props.subject,
                themePaletteId: 3, // todo rework that 
                themeFontId: 1,// same
                ThemeButton : {
                    create : {
                        themeButtonArr : {
                            create : [{
                                name : "primary",
                                variant: "solid",
                                shape: "rounded"
                            }, {
                                name : "secondary",
                                variant: "solid",
                                shape: "rounded"
                            }]
                        }
                    }
                }
            }
        })

        return newWebsite;
    }

    getWebsiteFull = async (props: { websiteId: number }) => {
        let website = await this.prisma.website.findUnique({
            where: { id: props.websiteId },
            include: {
                themePalette: {
                    include: {
                        themePaletteElems: true
                    }
                },
                themeFont: true,
                ThemeButton: {
                    include : {
                        themeButtonArr : true
                    }
                },
                websiteSection: {
                    include: {
                        websiteSectionOrder: true,
                        buttons: true,
                        typographies: true,
                        images: true,
                        ThemeSectionSpacing : true
                        //  configTemplate : true
                    }
                },

            }
        });

        if (!website) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        return website;
    }

    createNewSectionV4 = async (props: ICreateNewSectionV3) => {
        //const user = await this.userv2Service.findById(props.userId);
        let currentOrder = props.order;

        // get template target
        const template = await this.configTemplateService.getTemplateVariantWtId(props.templateId); //this.prisma.templateVariant.findUnique({where : {id : props.templateId}});

        if (!template) throw new HttpException('No template variant found', HttpStatus.NOT_FOUND);

        console.log("parse template config")
        const configJSON = parseTemplateConfigStringToJSON(template.config);

        // cxheck if all key are present inside data
        // basic validation for the moment rework with a better version later
        let button: IButtonRow[] = [];
        let typography: ITypographyRow[] = [];
        let img: IImageRow[] = [];

        console.log("1) encode data")
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
            } else if (currentElem.kind === "img" && templateElem.kind === "img" && currentElem.order === templateElem.order) {
                img.push({
                    order: templateElem.order ?? -1,
                    url: currentElem.url,
                    filter: currentElem.filter,
                    radius: currentElem.radius,
                    animation: currentElem.animation
                })
            }
        }

        // moove all section order for our new section order
        //console.log("update many")
        //console.log(img);
        await this.prisma.websiteSectionOrder.updateMany({
            where: {
                websiteId: props.websiteId,
                order: { gte: currentOrder } // greater than or egual
            },
            data: {
                order: {
                    increment: 1
                },
            }
        });

        console.log("2 create section")
        await this.prisma.websiteSection.create({
            data: {
                websiteId: props.websiteId,
                configTemplateId: props.templateId,
                themePaletteOrder: 0,
                websiteSectionOrder: {
                    create: {
                        websiteId: props.websiteId,
                        order: props.order
                    }
                },
                ThemeSectionSpacing: {
                    create: {
                        top : "medium",
                        bottom : "medium",
                        horizontalAlign : "center"
                    }
                },
                buttons: {
                    create: button
                },
                typographies: {
                    create: typography
                },
                images: {
                    create: img
                }
            }
        });

        console.log("get website full")
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
                buttons: true,
                images: true,
                ThemeSectionSpacing : true
            },
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
        let buttons = props.data.filter(e => e.kind === "button") as IUpdateButton[];
        let typography = props.data.filter(e => e.kind === "typography") as IUpdateTypography[];
        let img = props.data.filter(e => e.kind === "img") as IUpdateImg[];
        // typograpgy

        let dataUpdate = await this.prisma.websiteSection.update({
            where: { id: props.sectionId },
            include: {
                buttons: true,
                typographies: true,
                images: true,
                websiteSectionOrder: true,
                ThemeSectionSpacing : true
            },
            data: {
                themePaletteOrder : props.layout.themePaletteOrder,
                ThemeSectionSpacing : {
                    update : {
                        where : {websiteSectionId : props.sectionId},
                        data : {
                            top : props.layout.themeSectionSpacing.top,
                            bottom : props.layout.themeSectionSpacing.top,
                            horizontalAlign : props.layout.themeSectionSpacing.horizontalAlign
                        },
                       
                    }
                },
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
                },
                images: {
                    updateMany: [
                        ...img.map(i => ({
                            where: { order: i.order },
                            data: {
                                url: i.url,
                                filter: i.filter,
                                radius: i.radius,
                                animation: i.animation
                            }
                        }))
                    ]
                }
            },
        });

        return dataUpdate;
    }

    // update global theme
    updateThemeV1 = async (props: IUpdateThemeV1) => {
        // save new theme
        let ret = await this.prisma.website.update({
            where: {
                id: props.websiteId,
            },
            data: {
                themePaletteId: props.themePaletteId,
                themeFontId: props.themeFontId,
            },
            include: {
                themePalette: {
                    include: {
                        themePaletteElems: true,
                    }
                },
                themeFont: true,
                ThemeButton: {
                    include : {
                        themeButtonArr : true
                    }
                },
            }
        });

        // update theme button
        let themeButton = props.themeButton;
        let arrProm : Promise<any>[] = [];
        for (let i = 0; i < props.themeButton.themeButtonArr.length; i++) {
            let currElem = props.themeButton.themeButtonArr[i];
            arrProm.push(this.prisma.themeButtonElem.update({
                where : {id : currElem.id},
                data : {
                    name : currElem.name,
                    shape : currElem.shape,
                    variant : currElem.variant
                }
            }))
        }
        let consumeAll = await Promise.allSettled(arrProm);

        // get back data
        let newData = await this.prisma.website.findUnique({
            where: {
                id: props.websiteId,
            },
            include: {
                themePalette: {
                    include: {
                        themePaletteElems: true,
                    }
                },
                themeFont: true,
                ThemeButton: {
                    include : {
                        themeButtonArr : true
                    }
                }
            }
        });

        return newData;
    }
}
