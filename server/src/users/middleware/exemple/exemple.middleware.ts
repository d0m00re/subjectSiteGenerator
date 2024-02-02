import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ExempleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log("exemple middleware")
    console.log(req.headers.authorization)
    if (req.headers.authorization !== "admin") {
      console.log("you are an admin")
      //req?.data = {}
      throw new HttpException('No authorization', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
