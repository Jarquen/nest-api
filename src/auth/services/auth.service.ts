import { Injectable } from '@nestjs/common';
import {UsersService} from "../../users/services/users.service";
import User from "../../users/interfaces/user.interface";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findOne(email);

        if (user && bcrypt.compare(password, user.password) === true) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
