import {Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards} from "@nestjs/common";
import {EventsService} from "../services/events.service";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {CreateEventDto} from "../dto/create-event.dto";
import {Event} from "../event.entity";

@Controller('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Event[]> {
        return await this.eventsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Event> {
        return await this.eventsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req, @Body() createEvent: CreateEventDto): Promise<Event> {
        return await this.eventsService.create(createEvent, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/validate')
    async validate(@Req() req, @Param('id') id: string): Promise<Event> {
        if (req.user.role === "Admin" || req.user.role === "ProjectManager") {
            return await this.eventsService.validation(id, true, req.user);
        } else {
            throw new UnauthorizedException("An employee doesn't have the permission to decline an event");
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id/decline')
    async decline(@Req() req, @Param('id') id: string): Promise<Event> {
        if (req.user.role === "Admin" || req.user.role === "ProjectManager") {
            return await this.eventsService.validation(id, false, req.user);
        } else {
            throw new UnauthorizedException("An employee doesn't have the permission to decline an event");
        }
    }

}