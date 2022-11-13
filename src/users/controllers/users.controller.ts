import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {UsersService} from '../services/users.service'
import {User} from "../user.entity";
import {UserDto} from "../dto/user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Post('/auth/sign-up')
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    // @Post('/auth/login')
    // async login(@Body() userDto: UserDto): Promise<User> {
    //     return await this.usersService.login(userDto);
    // }
}
