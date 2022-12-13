import { Controller, Post, UseGuards, Request, Body, Req, Get } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { AuthService } from "./auth.service";
import { FortyTwoGuard } from "./guard/42-auth.guards";
import { LocalAuthGuard } from "./guard/local-auth.guards";

@Controller("auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        return this._authService.login(req);
    }

    @UseGuards(FortyTwoGuard)
    @Get('42/login')
    async fortyTwoAuth() {}

    @Get('42/redirect')
    @UseGuards(FortyTwoGuard)
    async fortyTwoRedirect(@Req() req) {
        console.log(req.user);
    }

    @Post('register')
    async register(@Body() userCreateInput: Prisma.UserCreateInput) : Promise<string> {
        return await this._authService.register(userCreateInput);
    }
}