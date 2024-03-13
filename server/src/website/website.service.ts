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

        console.log("config parse : ")
        console.log(configJSON);

        let arrProm : any = []

        for (let i = 0; i < configJSON.length; i++) {
            // key tagret
            let keyTarget = configJSON[i].kind;

            if (keyTarget === "text") {
                // get current text elements
                let currentElem = sectionWithSubElem.typographies.find(e => e.order === configJSON[i].order);
                if (currentElem) {
                    // update text
                    console.log(`${currentElem.text} ---> ${props.data[configJSON[i].label]}`)
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
                    console.log(`${currentElem.text} ---> ${props.data[configJSON[i].label]}`)
                    currentElem.text = props.data[configJSON[i].label];
                    arrProm.push(this.prisma.templateElemButton.update({
                        where : { id : currentElem.id},
                        data : {text : currentElem.text}
                    }));
                }
            }
        }

        console.log("promise update consume")
        let dataUpdate = await Promise.all(arrProm);

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
}
