import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    user(user: User): Promise<User | null>;
    users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[] | null>;
    createUser(data: User): Promise<User>;
    updateUser(params: {
        where: User;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>;
}
