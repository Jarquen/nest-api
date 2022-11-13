import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class UserDto {
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8)
    password: string
}