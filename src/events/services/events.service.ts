import {Injectable} from "@nestjs/common";
import {Event} from "../event.entity";
import {CreateEventDto} from "../dto/create-event.dto";

@Injectable()
export class EventsService {

    async findAll(): Promise<Event[]> {
        return await Event.find({relations: ['user']});
    }

    async findOne(id: string): Promise<Event> {
        return await Event.findOne({where: {id: id}});
    }

    async create(eventProps: CreateEventDto, userId: string): Promise<Event> {
        const {date, eventDescription, eventType} = eventProps;

        const sameDay = await Event.find({where: {date: date}});

        const event = Event.create();
        event.date = date;
        if (eventDescription) event.eventDescription = eventDescription;
        event.eventType = eventType;
        event.userId = userId;
        await event.save();

        return event;
    }
}