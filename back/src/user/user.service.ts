import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async user(user: User): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: user,
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[] | null> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: User) : Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async updateUser(params: {
        where: User;
        data: Prisma.UserUpdateInput;
    }) : Promise<User>{
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        })
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput) : Promise<User> {
        return this.prisma.user.delete({ where });
    }
}