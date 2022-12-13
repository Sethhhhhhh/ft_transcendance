import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>;
    findByPayload(id: number): Promise<User | null>;
    findByLogin(email: string): Promise<User | null>;
}
