import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {User} from '../user.entity'
import {CreateUserDto} from "../dto/create-user.dto";
import {UserDto} from "../dto/user.dto";
import * as bcrypt from 'bcrypt';
import {isUUID} from "class-validator";

@Injectable()
export class UsersService {

    async findAll(): Promise<User[]> {
        const user = User.find();
        return user;
    }

    async create(userProps: CreateUserDto) {
        const {email, username, password} = userProps;

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = User.create();
        user.email = email;
        user.username = username;
        user.password = hashedPassword;
        await user.save();
        return user;
    }

    async findOne(email: string): Promise<User | undefined> {
        return await User.findOne({where: {email: email}})
    }

    async findById(id: string): Promise<User | undefined> {
        if (!isUUID(id)) throw new BadRequestException('Invalid id uuid')
        const user = await User.findOne({where: {id: id}})
        if (!user) {
            throw new NotFoundException('Invalid id');
        }
        return user;
    }

    async findMe(email: string): Promise<any | undefined> {
        const user = await User.findOne({where: {email: email}});
        const {password, ...result} = user;
        return result;
    }
}