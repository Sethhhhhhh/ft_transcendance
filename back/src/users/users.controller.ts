import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from './guard/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly _usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<User[]> {
        return this._usersService.find({});
    }
}
