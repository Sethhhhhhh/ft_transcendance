import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as fs from 'fs';

@Injectable()
export class UsersService {
    constructor(
        private readonly _prismaService: PrismaService
    ) {}

    private _experienceGain: number = 10;
    private _nextLevelPourcentage: number = 2;
    private _defaultAvatar: string = 'default.png';

    async getAvatar(
        id: Prisma.UserWhereUniqueInput['id']
    ) : Promise<string> {
        try {
            const user: User = await this._prismaService.user.findUnique({ where: { id: Number(id) } })
            if (!user)
                return null;

            return user.avatar;
        } catch(err) {
            if (err instanceof UnauthorizedException)
                throw err;
            throw new InternalServerErrorException('Internal server error');
        }
    }

    async setAvatar(
        id: Prisma.UserWhereUniqueInput['id'],
        avatar: Express.Multer.File
    ) : Promise<User> {
        try {
            if (!avatar)
                throw new UnauthorizedException('Avatar not found');
                
            const olderAvatar = await this.getAvatar(id);
            if (olderAvatar && olderAvatar !== this._defaultAvatar) {
                await fs.promises.unlink(`./data/avatars/${olderAvatar}`);
            }

            const user = await this._prismaService.user.update({
                where: { id: Number(id) },
                data: { avatar: avatar.filename }
            });
        
            return user;
        } catch(err) {
            if (err instanceof UnauthorizedException)
                throw err;
            throw new InternalServerErrorException('Internal server error');
        }
    }

    async addExperience(
        id: Prisma.UserWhereUniqueInput['id'],
        point: number
    ) : Promise<User> {
        try {
            const user: User = await this._prismaService.user.findUnique({ where: { id: Number(id) } });

            if (!user)
                throw new UnauthorizedException('User not found');
        
            const newExperience: number = user.experience + (this._experienceGain * point);

            if (newExperience >= user.nextLevel) {
                return this._prismaService.user.update({
                    where: { id: Number(id) },
                    data: {
                        experience: newExperience - user.nextLevel,
                        level: user.level + 1,
                        nextLevel: (user.nextLevel * this._nextLevelPourcentage)
                    }
                });
            } else {
                return this._prismaService.user.update({
                    where: { id: Number(id) },
                    data: { experience: newExperience }
                });
            }
        } catch(err) {
            if (err instanceof UnauthorizedException)
                throw err;
            throw new InternalServerErrorException('Internal server error');
        }
    }

    async create(
        data: Prisma.UserCreateInput
    ) : Promise<User> {
        try {
            return this._prismaService.user.create({ data });
        } catch(err) {
            throw new UnauthorizedException("User already exist");
        }
    }

    async find(
        where: Prisma.UserWhereInput
    ) : Promise<User[] | null> {
        try {
            const users: (User[] | null) = await this._prismaService.user.findMany({ where });
            if (!users)
                return null;

            return users;
        } catch(err) {
            if (err instanceof UnauthorizedException)
                throw err;
            throw new InternalServerErrorException("Internal server error");
        }
    }

    async findOne(
        where: Prisma.UserWhereUniqueInput
    ) : Promise<User | null> {
        try {
            const user: (User | null) = await this._prismaService.user.findUnique({ where });
            if (!user)
                return null;

            return user;
        } catch(err) {
            if (err instanceof UnauthorizedException)
                throw err;
            throw new InternalServerErrorException("Internal server error");
        }
    }

    async update(
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput
    ) : Promise<User> {
        try {
            const user = await this._prismaService.user.update({ where, data });
            return user;
        } catch(err) {
            throw new InternalServerErrorException("Internal server error");
        }
    }
}
