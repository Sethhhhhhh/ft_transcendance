import { JwtPayload } from "../auth.dto";
import { UsersService } from "src/users/users.service";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _userService;
    constructor(_userService: UsersService);
    validate(payload: JwtPayload): Promise<import(".prisma/client").User[]>;
}
export {};
