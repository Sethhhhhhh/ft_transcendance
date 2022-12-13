import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private readonly _usersService: UsersService,
        private readonly _jwtService: JwtService    
    ) {}

    private _create_token(data: any) : string {
        const payload = { email: data.email, sub: data.id };

        return this._jwtService.sign(payload);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this._usersService.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async register(userCreateInput: Prisma.UserCreateInput) : Promise<string> {
        const { password } = userCreateInput;

        userCreateInput.password = await bcrypt.hash(password, 10);

        const user = await this._usersService.create(userCreateInput);
        if (!user) {
            throw new UnauthorizedException("Already exist");
        }

        return this._create_token(user);
    }

    login(user: Partial<User>): string {
        return this._create_token(user);
    }
}