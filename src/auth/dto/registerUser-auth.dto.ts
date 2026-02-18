import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    fname: string;

    @IsString()
    lname: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
