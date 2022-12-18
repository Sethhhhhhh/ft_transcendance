"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
const jwt_guard_1 = require("./guard/jwt.guard");
const users_service_1 = require("./users.service");
const fs = require("fs");
let UsersController = class UsersController {
    constructor(_usersService) {
        this._usersService = _usersService;
    }
    async getAll() {
        return this._usersService.find({});
    }
    async setUsername(req, username) {
        const { id } = req.user;
        return this._usersService.updateUsername(id, username);
    }
    async getAvatar(id, res) {
        const filename = await this._usersService.getAvatar(id);
        const filePath = (0, path_1.resolve)('./data/avatars', filename);
        const file = (0, fs_1.createReadStream)(filePath);
        res.set({
            'Content-Disposition': `inline; filename="${filename}"`,
            'Content-Type': 'image/*',
        });
        return new common_1.StreamableFile(file);
    }
    async setAvatar(req, avatar) {
        if (!avatar || !avatar.filename)
            throw new common_1.BadRequestException('No file was uploaded');
        const { id } = req.user;
        const olderAvatar = await this._usersService.getAvatar(id);
        if (olderAvatar) {
            const filePath = (0, path_1.resolve)('./data/avatars', olderAvatar);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        await this._usersService.setAvatar(id, avatar.filename);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("username"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "setUsername", null);
__decorate([
    (0, common_1.Get)(':id/avatar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './data/avatars',
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.filename)}`);
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
                cb(new common_1.BadRequestException('Invalid file type'), false);
        }
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "setAvatar", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map