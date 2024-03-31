import { Injectable } from '@nestjs/common';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { PrismaService } from 'src/prisma.service';
import { Userv2Service } from 'src/userv2/userv2.service';

@Injectable()
export class ThemeGroupService {
    constructor(
        private prisma: PrismaService,
        private configTemplateService: ConfigTemplateService,
        private userv2Service: Userv2Service
    ) { }

    /**
     * create a theme group
     * @param props {name : string}
     * @returns 
     */
    create = async (props : {name : string}) => {
        let data = await this.prisma.themeGroup.create({
            data : {
                name : props.name
            }
        });
        return data;
    }

    /**
     * get all with join of themePalette and themePaletteElem
     */
    getAll = async () => {
        let data = await this.prisma.themeGroup.findMany({
            include : {
                themePalettes : {
                    include : {
                        themePaletteElems : true
                    }
                }   
            }
        })
        return data;
    }
}
