import {Injectable} from "@nestjs/common";
import {User} from '../user.entity'
import {CreateUserDto} from "../dto/create-user.dto";
import {UserDto} from "../dto/user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    async findAll() {
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

    // async login(userProps: UserDto) {
    //     const user = await User.findOne(userProps.email)
    //     return await User.findOne({
    //         where: {
    //             email: userProps.email,
    //             password: userProps.password
    //         }
    //     });
    // }
}