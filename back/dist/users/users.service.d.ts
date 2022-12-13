import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class UsersService {
    private readonly _prismaService;
    constructor(_prismaService: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    find(where: Prisma.UserWhereInput): Promise<User[]>;
    findOne(where: Prisma.UserWhereUniqueInput): Promise<User>;
}
