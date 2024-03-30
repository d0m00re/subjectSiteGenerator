import { Injectable } from '@nestjs/common';
import { ConfigTemplateService } from 'src/config-template/config-template.service';
import { PrismaService } from 'src/prisma.service';
import { Userv2Service } from 'src/userv2/userv2.service';

@Injectable()
export class ThemePaletteElemService {
    constructor(
        private prisma: PrismaService,
        private configTemplateService: ConfigTemplateService,
        private userv2Service: Userv2Service
    ) { }
}
