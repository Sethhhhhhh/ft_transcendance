/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { Response } from 'express';
export declare class AvatarController {
    constructor();
    getAvatar(filename: string, response: Response): StreamableFile;
    uploadAvatar(image: Express.Multer.File): Promise<{
        filename: string;
    }>;
}
