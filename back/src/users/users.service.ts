import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly _prismaService: PrismaService
    ) {}

    async getAvatar(id: string) : Promise<string> {
        const user = await this._prismaService.user.findUnique({ where: { id: id } })

        return user.avatar;
    }

    async setAvatar(id: Prisma.UserWhereUniqueInput['id'], avatar: string) : Promise<User> {
        return this._prismaService.user.update({
            where: { id },
            data: { avatar }
        });
    }

    async updateUsername(id: Prisma.UserWhereUniqueInput['id'], username: string) : Promise<User> {
        return this._prismaService.user.update({
            where: { id },
            data: { username }
        });
    }

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
