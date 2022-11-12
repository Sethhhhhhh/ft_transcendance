import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    user(user: Prisma.UserWhereUniqueInput): Promise<User | null>;
    users(): Promise<User[] | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>;
}
