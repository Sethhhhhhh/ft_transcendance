import { BadRequestException, Body, Controller, Get, Param, Post, Req, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma, User } from '@prisma/client';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { JwtAuthGuard } from './guard/jwt.guard';
import { UsersService } from './users.service';
import * as fs from 'fs';

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

        return this._usersService.updateUsername(id, username);
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
                    return cb(null, `${randomName}${extname(file.filename)}`);
                }
            }),
            limits: {
                fileSize: 5 * 1024 * 1024,
                files: 1,
            },
            fileFilter: (req, file, cb) => {
                const allowedMimes = [
                    'image/jpeg',
                    'image/pjpeg',
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
        if (!avatar || !avatar.filename)
            throw new BadRequestException('No file was uploaded');

        const { id } = req.user as User;
        const olderAvatar = await this._usersService.getAvatar(id);

        if (olderAvatar) {
            const filePath = resolve('./data/avatars', olderAvatar);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        
        await this._usersService.setAvatar(id, avatar.filename);
    }

}
