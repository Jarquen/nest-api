import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(3)
    username: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8)
    password: string
}