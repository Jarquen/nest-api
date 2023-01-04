import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {User} from '../user.entity'
import {CreateUserDto} from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import {isUUID} from "class-validator";
import {Event} from "../../events/event.entity";
import {Between} from "typeorm";

const dayjs = require('dayjs')

@Injectable()
export class UsersService {

    async findAll(): Promise<User[]> {
        return User.find();
    }

    async create(userProps: CreateUserDto): Promise<User> {
        const {email, username, password, role} = userProps;

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = User.create();
        user.email = email;
        user.username = username;
        user.password = hashedPassword;
        if (role) user.role = role;
        await user.save();
        return user;
    }

    async findOne(email: string): Promise<User | undefined> {
        return await User.findOne({where: {email: email}})
    }

    async findById(id: string): Promise<User | undefined> {
        if (!isUUID(id)) throw new BadRequestException('Invalid id uuid');
        const user = await User.findOne({where: {id: id}})
        if (!user) {
            throw new NotFoundException('Invalid id');
        }
        return user;
    }

    async findMealVouchers(id: string, month: number): Promise<number> {
        const NumberOfDays = dayjs().month(month).daysInMonth();
        const DayOfMonth = dayjs().month(month).toDate();

        let firstDayOfMonth = dayjs(DayOfMonth).startOf('month');
        const lastDayOfMonth = dayjs(DayOfMonth).endOf('month');

        const numberOfEvent = await Event.count({where: {userId: id, date: Between(firstDayOfMonth.toDate(), lastDayOfMonth.toDate())}});

        let dayOfWork = 0;
        for (let i = 0; i < NumberOfDays; i++) {
            if (firstDayOfMonth.day() >= 1 && firstDayOfMonth.day() <= 5) {
                dayOfWork++;
            }
            firstDayOfMonth = firstDayOfMonth.add(1, 'day');
        }

        return (dayOfWork - numberOfEvent) * 8;
    }
}