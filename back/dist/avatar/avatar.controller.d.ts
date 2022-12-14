/// <reference types="multer" />
export declare class AvatarController {
    uploadFile(file: Express.Multer.File): void;
    uploadFileAndPassValidation(body: any, file: Express.Multer.File): void;
}
