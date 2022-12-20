import { BadRequestException, Body, Controller, Get, Param, Post, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma, User, Friend } from '@prisma/client';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { JwtAuthGuard } from './guard/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly _usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<User[]> {
        return this._usersService.find({});
    }

    @UseGuards(JwtAuthGuard)
    @Post("username")
    async setUsername(@Req() req: Request, @Body('username') username: string) {
        const { id } = req.user as User;

        return this._usersService.update({ id }, { username });
    }

    @Get(':id/avatar')
    async getAvatar(
        @Param('id') id: Prisma.UserWhereUniqueInput['id'],
        @Res({ passthrough: true }) res: Response
    ): Promise<StreamableFile> {
        const filename = await this._usersService.getAvatar(id);

        const filePath = resolve('./data/avatars', filename);
        const file = createReadStream(filePath);

        res.set({
            'Content-Disposition': `inline; filename="${filename}"`,
            'Content-Type': 'image/*',
        });

        return new StreamableFile(file);
    }

    @UseGuards(JwtAuthGuard)
    @Post('avatar')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './data/avatars',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`);
                }
            }),
            limits: {
                fileSize: 5 * 1024 * 1024,
                files: 1,
            },
            fileFilter: (req, file, cb) => {
                const allowedMimes = [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                ];
                if (allowedMimes.includes(file.mimetype))
                    cb(null, true);
                else
                    cb(new BadRequestException('Invalid file type'), false);
            }
        }),
    )
    async setAvatar(
        @Req() req: Request,
        @UploadedFile() avatar: Express.Multer.File,
    ) {
        const { id } = req.user as User;
        return this._usersService.setAvatar(id, avatar);    
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/experience')
    async setExperience(
        @Param('id') id: Prisma.UserWhereUniqueInput['id'],
        @Body('point') point: number
    ): Promise<User> {
        return this._usersService.addExperience(id, point);
    }


    @UseGuards(JwtAuthGuard)
    @Post('sendFriendRequest')
    async sendFriendRequest(
        @Req() req: Request,
        @Body('friendId') friendId: number
    ): Promise<Friend> {
        const { id } = req.user as User;
        return this._usersService.sendFriendRequest(id, friendId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('acceptFriendRequest')
    async acceptFriendRequest(
        @Req() req: Request,
        @Body('friendId') friendId: number
    ): Promise<Friend> {
        const { id } = req.user as User;
        return this._usersService.acceptFriendRequest(id, friendId);
    }

}
