import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly _prismaService: PrismaService
    ) {}

    async create(data: Prisma.UserCreateInput) : Promise<User> {
        return this._prismaService.user.create({ data });
    }

    async find(where: Prisma.UserWhereInput) : Promise<User[]> {
        return this._prismaService.user.findMany({ where });
    }

    async findOne(where: Prisma.UserWhereUniqueInput) : Promise<User> {
        return this._prismaService.user.findUnique({ where });
    }
}
