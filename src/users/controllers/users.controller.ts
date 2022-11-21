import {Body, Controller, Get, Post, UsePipes, ValidationPipe, UseGuards, Req, Param} from '@nestjs/common';
import {CreateUserDto} from "../dto/create-user.dto";
import {UsersService} from '../services/users.service'
import {User} from "../user.entity";
import {AuthService} from "../../auth/services/auth.service";
import {LocalAuthGuard} from "../../auth/guards/local-auth.guard";
import {UserDto} from "../dto/user.dto";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @UsePipes(ValidationPipe)
    @Post('/auth/sign-up')
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@Req() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async getProfile(@Req() req) {
        // return await this.usersService.findMe(req.user.email);
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.usersService.findById(id)
    }
}
