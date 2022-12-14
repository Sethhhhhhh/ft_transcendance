import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class JwtPayload {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    email: string;
}