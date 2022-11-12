import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user";
import { UpdateUserDto } from "./dto/update-user";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createUser(userData: CreateUserDto): Promise<User>;
    updateUser(id: string, data: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
