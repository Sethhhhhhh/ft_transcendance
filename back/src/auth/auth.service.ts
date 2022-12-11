import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { LoginUserDto } from "src/user/dto/login-user";
import { UserService } from "src/user/user.service";
import { JwtPayload } from "./strategy/jwt.strategy";

@Injectable()
export class AuthService {
    constructor(
        private readonly user: UserService,
        private readonly jwt: JwtService,
    ) {}

    async login(loginUserDto: LoginUserDto) : Promise<string> {
        const user = await this.user.findByLogin(loginUserDto);
        const token = this._createToken(user);

        return token;
    }

    
    async register(registerUserDto: CreateUserDto) {
        const user = await this.user.create(registerUserDto);
        const token = this._createToken(user);
       
        return token;
    }

    async validateUser(payload: JwtPayload) : Promise<User> {
        const user = await this.user.findByPayload(payload);
        
        if (!user)
            throw new HttpException("INVALID_TOKEN", HttpStatus.UNAUTHORIZED);
        return user;
    }

    private _createToken({ username }): string {
        const payload: JwtPayload = { username, auth: false };
        const token = this.jwt.sign(payload);

        return token;
    }
}