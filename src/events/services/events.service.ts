import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {Event} from "../event.entity";
import {CreateEventDto} from "../dto/create-event.dto";
import {Between} from "typeorm";
import {User} from "../../users/user.entity";
// import * as dayjs from 'dayjs'
const dayjs = require('dayjs')

@Injectable()
export class EventsService {

    async findAll(): Promise<Event[]> {
        return await Event.find({relations: ['user']});
    }

    async findOne(id: string): Promise<Event> {
        const event = await Event.findOne({where: {id: id}});
        if (!event) throw new NotFoundException("This event doesn't exist");
        return event;
    }

    async create(eventProps: CreateEventDto, user: User): Promise<Event> {
        const {date, eventDescription, eventType} = eventProps;

        const sameDay = await Event.findOne({where: {date: dayjs(date).toDate(), userId: user.id}});
        if (sameDay) throw new UnauthorizedException("you already have an event this day")

        const weekStart = dayjs(date).startOf('week').toDate();
        const endWeek = dayjs(date).startOf('week').add(1, 'week').toDate();

        const test = await Event.find({where: {date: Between(weekStart, endWeek), userId: user.id, eventType: "RemoteWork"}});
        if (test.length >= 2) throw new UnauthorizedException("You already have 2 day of remote work")

        const event = Event.create();
        event.date = date;
        if (eventDescription) event.eventDescription = eventDescription;
        event.eventType = eventType;
        event.userId = user.id;
        await event.save();

        return event;
    }

    async validation(id: string, validate: boolean): Promise<Event> {
        const event = await Event.findOne({where: {id: id}});
        if (!event) throw new NotFoundException("This event doesn't exist");
        if(event.eventStatus !== "Pending") throw new UnauthorizedException("This event is not pending");

        validate ? event.eventStatus = "Accepted" : event.eventStatus = "Declined"
        return event
    }
}