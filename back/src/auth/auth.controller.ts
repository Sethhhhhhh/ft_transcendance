import { Controller, Post, UseGuards, Body, Req, Get } from "@nestjs/common";
import { CreateUserDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { FortyTwoGuard } from "./guard/42-auth.guards";
import { LocalAuthGuard } from "./guard/local-auth.guards";

import * as fs from 'fs';
import * as url from 'url';
import { downloadImageAndSave } from "src/utils";

@Controller("auth")
export class AuthController {
    constructor(private readonly _authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        return this._authService.login(req.user);
    }

    @UseGuards(FortyTwoGuard)
    @Get('42')
    fortyTwoAuth() {}

    @Get('42/redirect')
    @UseGuards(FortyTwoGuard)
    async fortyTwoRedirect(@Req() req: any) {
		const { username, password, email, imageURL } = req.user;
        
        const user = await this._authService.validateUser(email, password, true);
        if (!user) {
            const avatar = await downloadImageAndSave(imageURL);
			return this._authService.register({password, username, email, isAuth: true, avatar });
        } else
            return this._authService.login(user);
    }

    @Post('register')
    async register(@Body() userCreateInput: CreateUserDto) {
        const token = await this._authService.register({ isAuth: false, ...userCreateInput });
        return token;
    }
}