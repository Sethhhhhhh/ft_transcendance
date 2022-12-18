import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './auth.dto';
export declare class AuthService {
    private _usersService;
    private _jwtService;
    constructor(_usersService: UsersService, _jwtService: JwtService);
    private _create_token;
    validateUser(email: string, password: string, isAuth: boolean): Promise<any>;
    register(userCreateInput: CreateUserDto): Promise<string>;
    login(user: Partial<User>): string;
}
