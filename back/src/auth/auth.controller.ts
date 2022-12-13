import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/local-auth.guards";

@Controller("auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return this._authService.login(req);
    }
    
    @Post('register')
    async register(@Body() userCreateInput: Prisma.UserCreateInput) : Promise<string> {
        return await this._authService.register(userCreateInput);
    }
}