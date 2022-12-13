import { User } from '@prisma/client';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly _usersService;
    constructor(_usersService: UsersService);
    getAll(): Promise<User[]>;
}
