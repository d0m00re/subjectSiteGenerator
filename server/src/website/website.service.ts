import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WebsiteService {
    constructor(
        private prisma : PrismaService,
    ){}

    getWebsiteFull = async (props : {websiteId : number}) => {
        let website = await this.prisma.website.findUnique({
            where : {id : props.websiteId},
            include: {
                websiteSection: {
                    include: {
                        websiteSectionOrder: true,
                        buttons : true,
                        typographies : true,
                      //  configTemplate : true
                    }
                }
            }
        });

        if (!website) throw new HttpException('Not found', HttpStatus.NOT_FOUND);

        return website;
    }
}
