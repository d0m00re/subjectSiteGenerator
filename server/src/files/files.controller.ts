import { Controller, Post, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import * as multer from 'multer';

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
        console.log("wtf : ")
        // @ts-ignore
        console.log(req.user)
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
       cb(null, file.fieldname + '-' + uniqueSuffix);
    }
   });

   /**
    * {
  fieldname: 'file',
  originalname: 'Screenshot 2023-08-22 224137.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: './cdn',
  filename: 'file-1710959544202-561512303',
  path: 'cdn/file-1710959544202-561512303',
  size: 71135
}
    */
@Controller('files')
export class FilesController {
    @UseGuards(JwtGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file', {storage}))
    uploadFile(@UploadedFile() file) {
        console.log("file data : ");
        console.log(file);

        return {message : "success upload file"};
    }
}
