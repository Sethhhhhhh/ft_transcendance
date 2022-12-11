import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @IsNotEmpty()
    password: string;
}