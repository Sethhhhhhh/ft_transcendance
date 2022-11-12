import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create-user";
import { UpdateUserDto } from "./dto/update-user";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(): Promise<User[]> {
        return this.userService.users();
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<User> {
        return this.userService.user({ id });
    }

    @Post()
    async createUser(
        @Body() userData: CreateUserDto
    ): Promise<User> {
        const { username } = userData;
        return this.userService.createUser({
            username
        });
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() data: UpdateUserDto    
    ) : Promise<User> {
        const { username } = data;
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: { username } 
        });
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) : Promise<User> {
        return this.userService.deleteUser({ id: Number(id) });
    }
}