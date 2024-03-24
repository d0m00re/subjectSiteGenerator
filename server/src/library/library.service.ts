import { Get, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ILibraryEntity } from './library.entity';

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
}
