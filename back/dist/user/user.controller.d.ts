import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    update(id: string, data: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
