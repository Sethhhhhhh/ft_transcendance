import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Prisma, User } from '@prisma/client';
export declare class AuthService {
    private readonly _usersService;
    private readonly _jwtService;
    constructor(_usersService: UsersService, _jwtService: JwtService);
    private _create_token;
    validateUser(email: string, password: string, isAuth: boolean): Promise<any>;
    register(userCreateInput: Prisma.UserCreateInput): Promise<string>;
    login(user: Partial<User>): string;
}
