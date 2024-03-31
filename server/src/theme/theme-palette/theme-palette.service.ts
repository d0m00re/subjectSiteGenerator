import { Injectable } from '@nestjs/common';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { PrismaService } from 'src/prisma.service';
import { Userv2Service } from 'src/userv2/userv2.service';

interface IPaletteWtElem {
    bgColor : string;
    textColor : string;
}

interface ICreateWtPaletteElem {
    themeGroupId : number;
    name : string;
    paletteElements : IPaletteWtElem[]
}

@Injectable()
export class ThemePaletteService {
    constructor(
        private prisma: PrismaService,
        private configTemplateService: ConfigTemplateService,
        private userv2Service: Userv2Service
    ) { }

    createWtPaletteElem = async(props : ICreateWtPaletteElem) => {
        let data = await this.prisma.themePalette.create({
            data : {
                themeGroupId : props.themeGroupId,
                name : props.name
            }
        });

        //
        let dataPalette = props.paletteElements.map((elems, order) => this.prisma.themePaletteElem.create({
            data : {
              //  ...elems,
                textColor : elems.textColor,
                bgColor : elems.bgColor,
                order : order,
                themePaletteId : data.id,
                public : true
            //    themePaletteId : data.id
            }
        }))

        let consume = Promise.allSettled(dataPalette);

        // get back
        let dataCurr = await this.prisma.themePaletteElem.findFirst({
            where : {
                id : data.id
            },
            include : {
                ThemePalette : true
            }
        })

        return dataCurr;
    }
}
