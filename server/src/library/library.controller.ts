import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { LibraryService } from './library.service';
import * as multer from 'multer';
import { JwtCookieParserGuard } from 'src/authv2/guard/jwt-cookie-parser.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ILibraryEntity } from './library.entity';
import { Request, Response } from 'express';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // @ts-ignore
        console.log(`user id : ${req?.user?.id ?? ""}`)
        // @ts-ignore
        console.log(`*********** user id : ${req?.user?.userId ?? ""}`)
        // @ts-ignore
        console.log(req?.user)
        // @ts-ignore
        //console.log("user id : ", req?.user?.id)
        cb(null, './cdn'); // Set the destination directory
    },
    filename: function (req, file, cb) {
        console.log("wtf : ", file.mimetype)
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        // @ts-ignore
        console.log(req.user)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}` );
    }
});

@Controller('library')
export class LibraryController {
    constructor(
        private libraryService: LibraryService
    ) { }

    // get one with id
    /*
    @Get(":id")
    async getWithId(@Param('id') id: number) {
        let data = await this.libraryService.getWithId({ id: id });
        return data;
    }
    */


    @UseGuards(JwtCookieParserGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file', { storage }))
    async uploadFile(@UploadedFile() file, @Req() req : Request) {
        console.log("file data : ");
        console.log(file);

        // encode file
        let encodeData : ILibraryEntity = {
            userId : req.user.id,
            path       : file.path, // could be path or other things
            sourceType : "local",
            encoding   : file.encoding, // 7bit
            mimetype   : file.mimetype,//String // image/cdn
            isPublic   : false,//Boolean // if public all tthe peaple copuld acces it and use it
            size       : file.size,
            filename : file.filename,
            originalname : file.originalname
        }
        /*
        {
            fieldname: 'file',
            originalname: 'reguuuuuu.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination: './cdn',
            filename: 'file-1711279810952-772577359.png',
            path: 'cdn/file-1711279810952-772577359.png',
            size: 2371
        }
        */
        let data = await this.libraryService.uploadFile(encodeData);
        return data;
    }

    @Get(':imageName')
    async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
      try {
        const stream = await this.libraryService.getImage(imageName);
        stream.pipe(res); // Stream the image to the response
      } catch (error) {
        // Handle errors, e.g., image not found
        res.status(404).send('Image not found');
      }
    }


    @UseGuards(JwtCookieParserGuard)
    @Get()
    async getAllMyLibraryItems  ( @Req() req : Request)  {
        let data = await this.libraryService.getAllMyLibrary({userId : req.user.id});
        return data;
    }
}
