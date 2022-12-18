/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly _usersService;
    constructor(_usersService: UsersService);
    getAll(): Promise<User[]>;
    setUsername(req: Request, username: string): Promise<User>;
    getAvatar(id: Prisma.UserWhereUniqueInput['id'], res: Response): Promise<StreamableFile>;
    setAvatar(req: Request, avatar: Express.Multer.File): Promise<void>;
}
