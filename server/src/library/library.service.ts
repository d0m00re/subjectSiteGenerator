import { Get, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IGetAllMyLibrairy, ILibraryEntity } from './library.entity';

import * as path from 'path';
import * as fs from 'fs';

/*
  id     Int    @id @default(autoincrement())
  url    String
  source String // local / cdn

  isPublic Boolean // if public all tthe peaple copuld acces it and use it

  userId Int // Foreign key to reference User
  user   User @relation(fields: [userId], references: [id])

*/

@Injectable()
export class LibraryService {
    constructor(
        private prismaService : PrismaService
    ){}
    // get all
    getWithId = async (props : {id : number}) => {
        let data = await this.prismaService.library.findUnique({
            where : {
                id : props.id
            }
        });
        return data;
    }
    

    // create upload record
    uploadFile = async (props : ILibraryEntity) => {
        let result = await this.prismaService.library.create({data : {
            userId : props.userId,
            path : props.path,
            sourceType : props.sourceType,
            encoding : props.encoding,
            mimetype : props.mimetype,
            isPublic : props.isPublic,
            size : props.size,
            filename : props.filename,
            originalname : props.originalname
        }})
        
        return result;
    }

    getAllMyLibrary = async(props : IGetAllMyLibrairy) => {
        let data = await this.prismaService.library.findMany({where : {userId : props.userId}})
    
        return data;
    }

    getImage(imageName: string): Promise<fs.ReadStream> {
        console.log("image name :")
        console.log(imageName)
        return new Promise((resolve, reject) => {
          const imagePath = `cdn/${imageName}` //path.join(__dirname, '..', 'images', imageName);
          const stream = fs.createReadStream(imagePath);
          stream.on('open', () => resolve(stream));
          stream.on('error', error => reject(error));
        });
      }
}
