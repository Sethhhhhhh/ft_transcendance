import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('avatar')
export class AvatarController {

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

    @Post('file')
    uploadFileAndPassValidation(
        @Body() body: any,
        @UploadedFile() file: Express.Multer.File,
    ) {
        console.log(file);
    }
}

