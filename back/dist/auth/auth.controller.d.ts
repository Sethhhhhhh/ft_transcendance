import { Prisma } from "@prisma/client";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly _authService;
    constructor(_authService: AuthService);
    login(req: any): Promise<string>;
    register(userCreateInput: Prisma.UserCreateInput): Promise<string>;
}
