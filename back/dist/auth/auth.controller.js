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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("./auth.dto");
const auth_service_1 = require("./auth.service");
const _42_auth_guards_1 = require("./guard/42-auth.guards");
const local_auth_guards_1 = require("./guard/local-auth.guards");
let AuthController = class AuthController {
    constructor(_authService) {
        this._authService = _authService;
    }
    login(req) {
        return this._authService.login(req);
    }
    fortyTwoAuth() { }
    async fortyTwoRedirect(req) {
        const { username, password, email } = req === null || req === void 0 ? void 0 : req.user;
        const user = await this._authService.validateUser(email, password, true);
        if (!user)
            return this._authService.register({ password, username, email, isAuth: true });
        else
            return this._authService.login(user);
    }
    async register(userCreateInput) {
        return this._authService.register(Object.assign({ isAuth: false }, userCreateInput));
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guards_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(_42_auth_guards_1.FortyTwoGuard),
    (0, common_1.Get)('42/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "fortyTwoAuth", null);
__decorate([
    (0, common_1.Get)('42/redirect'),
    (0, common_1.UseGuards)(_42_auth_guards_1.FortyTwoGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "fortyTwoRedirect", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map