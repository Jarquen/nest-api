import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateEventDto {
    @IsNotEmpty()
    date: Date;

    @IsOptional()
    eventDescription: string;

    @IsNotEmpty()
    eventType: 'RemoteWork' | 'PaidLeave';
}