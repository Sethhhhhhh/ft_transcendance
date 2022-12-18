import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(
        private readonly _prismaService: PrismaService
    ) {}

    private _experienceGain: number = 10;

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

    async addExperience(id: Prisma.UserWhereUniqueInput['id'], point: number) : Promise<User> {
        const user = await this._prismaService.user.findUnique({ where: { id: id } });

        if (!user)
            throw new Error('User not found');
    
        const newExperience: number = user.experience + (this._experienceGain * point);

        if (newExperience >= user.nextLevel) {
            return this._prismaService.user.update({
                where: { id },
                data: {
                    experience: newExperience - user.nextLevel,
                    level: user.level + 1,
                    nextLevel: user.nextLevel * 2
                }
            });
        } else {
            return this._prismaService.user.update({
                where: { id },
                data: { experience: newExperience }
            });
        }
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
