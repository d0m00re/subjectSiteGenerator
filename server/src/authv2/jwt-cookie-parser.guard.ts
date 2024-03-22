import { CanActivate, ExecutionContext, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
    
@Injectable()
export class JwtCookieParserGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.cookies.accessToken;
        if (!accessToken) {
            console.error("access token not found");
            return false;
        }
        if (accessToken) {
            try {
                const decodedToken = this.jwtService.decode(accessToken);
                // store token
                request['user'] = decodedToken;
            }
            catch(err) {
                console.error("Error decoding jwt token")
            }
        }
        return true;
    }
}