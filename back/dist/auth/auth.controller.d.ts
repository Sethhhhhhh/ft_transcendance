import { CreateUserDto } from "./auth.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly _authService;
    constructor(_authService: AuthService);
    login(req: any): string;
    fortyTwoAuth(): void;
    fortyTwoRedirect(req: any): Promise<string>;
    register(userCreateInput: CreateUserDto): Promise<string>;
}
