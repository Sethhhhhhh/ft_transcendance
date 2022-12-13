import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Prisma, User } from '@prisma/client';
export declare class AuthService {
    private readonly _usersService;
    private readonly _jwtService;
    constructor(_usersService: UsersService, _jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    register(userCreateInput: Prisma.UserCreateInput): Promise<string>;
    login(user: Partial<User>): Promise<string>;
}
