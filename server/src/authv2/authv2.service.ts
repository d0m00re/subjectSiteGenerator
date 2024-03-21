import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Userv2Service } from 'src/userv2/userv2.service';
import * as dto from "./dto/authv2.dto";
import { hash } from 'bcrypt';

interface IRegister {
    email : string;
    password : string;
}

interface ILogin {
    email : string;
    password : string;
}

interface ILogout {}
interface IMe {
    accessToken : string
}

// tmp mooove inside env later
const JWT_SECRET = 'mykey'

@Injectable()
export class Authv2Service {
    constructor(
        private userV2Service: Userv2Service,
        private jwtService : JwtService
    ){}; 

    /**
     * validate user with email and password
     * @param email string
     * @param password string
     * @returns user without pass
     */
    async validateUser(email : string, password : string) : Promise<any> {
        const user = await this.userV2Service.findByEmail(email);

        if (!user) throw new HttpException("user not found", HttpStatus.NOT_FOUND);

        if (user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        throw new HttpException("user not found", HttpStatus.NOT_FOUND);
    }

    async signUp(props : IRegister) {
        //const hashedPassword = await b
        // check user exist or not
        let user = await this.userV2Service.findByEmail(props.email);
        
        if (user) throw new HttpException("user exist", HttpStatus.FORBIDDEN);

        let newUser = await this.userV2Service.create({
            email : props.email,
            name : props.email,
            password : props.password
        })
        
        return newUser;
    }

    async login(props : ILogin) {
        // payload
        let findUser = await this.userV2Service.findByEmailAndPass({
            email : props.email,
            password : props.password
        });
        
        if (!findUser)
            throw new HttpException("invalid", HttpStatus.UNAUTHORIZED);
        
        let payload = {email : findUser.email, id : findUser.id, name : findUser.name};
        console.log("current payload : ", payload)

        // encode token with jwt
        const data =  {
            accessToken : await this.jwtService.signAsync(payload, {
                expiresIn : '10d',
                secret : process.env.JWT_SECRET_KEY
            }),
            refreshToken : await this.jwtService.signAsync(payload, {
                expiresIn : '70d',
                secret : process.env.JWT_REFRESH_TOKEN_KEY
            })
        };

        // save acccess and refresh token inside db
        // save user with token
        let ret = await this.userV2Service.updateToken({
            id : findUser.id,
            accessToken : data.accessToken,
            refreshToken : data.refreshToken
        })

        //return {accessToken : accessToken};
        return ret;
    }

    async logout(props : ILogout) {
        return "logout";
    }

    async me(props : IMe) {
        // get us
        // decode token
        let res = await this.jwtService.decode(props.accessToken);

        return {
            email : res.email,
            id : res.id,
            name : res.name
        };
    }
}
