import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtGuard implements CanActivate {

    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_KEY
            });

            /*
            payload
            {
                username: 'jacklapiquette@gm.com',
                sub: { name: 'anson' },
                iat: 1707425250,
                exp: 1707428850
            }
            */

            console.log("payload");
            console.log(payload);

            request['user'] = payload;
        }
        catch (err) {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization.split(' ') ?? [];
        return type === "Bearer" ? token : undefined;
    }
}