import { Controller, Post, UseGuards, Request, Body, Req, Get } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateUserDto } from "./auth.dto";
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
    fortyTwoAuth() {}


    @Get('42/redirect')
    @UseGuards(FortyTwoGuard)
    async fortyTwoRedirect(@Req() req: any) {
		const { username, password, email } : CreateUserDto = req?.user;
        
        const user = await this._authService.validateUser(email, password, true);
        if (!user)
			return this._authService.register({password, username, email, isAuth: true});
		else
            return this._authService.login(user);
    }

    @Post('register')
    async register(@Body() userCreateInput: CreateUserDto) : Promise<string> {
        return this._authService.register({ isAuth: false, ...userCreateInput });
    }
}