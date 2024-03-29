import {Injectable, NotAcceptableException} from '@nestjs/common';
import {UsersService} from "../../users/services/users.service";
import User from "../../users/interfaces/user.interface";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.usersService.findOne(email);

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!user) {
            throw new NotAcceptableException('could not find the user');
        }
        if (user && isPasswordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id, username: user.username, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
