import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private _usersService: UsersService,
        private _jwtService: JwtService    
    ) {}

    private _create_token(data: any) : string {
        const payload = { email: data.email, id: data.id };

        return this._jwtService.sign(payload);
    }

    async validateUser(email: string, password: string, isAuth: boolean): Promise<any> {
        const user = await this._usersService.findOne({ email });

        if (!user)
			return null;

		if (!user.isAuth && !isAuth) {
			if (await bcrypt.compare(password, user.password)) {
				const { password, ...result } = user;
				return result;
			} else
				return null;
		} else if (isAuth) {
			const { password, ...result } = user;
			return result;
		}
    }

    async register(userCreateInput: CreateUserDto) : Promise<string> {
        const { password, isAuth } = userCreateInput;

		if (!isAuth)
        	userCreateInput.password = await bcrypt.hash(password, 10);

        try {
            const user = await this._usersService.create(userCreateInput);
            return this._create_token(user);
        } catch(err) {
            console.log(err);
            throw new UnauthorizedException("Already exist");
        }

    }

    login(user: Partial<User>): string {
        return this._create_token(user);
    }
}