import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private readonly _prismaService;
    constructor(_prismaService: PrismaService);
    getAvatar(id: string): Promise<string>;
    setAvatar(id: Prisma.UserWhereUniqueInput['id'], avatar: string): Promise<User>;
    updateUsername(id: Prisma.UserWhereUniqueInput['id'], username: string): Promise<User>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    find(where: Prisma.UserWhereInput): Promise<User[]>;
    findOne(where: Prisma.UserWhereUniqueInput): Promise<User>;
}
