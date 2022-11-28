import {IsNotEmpty} from "class-validator";

export class CreateProjectUsersDto {
    @IsNotEmpty()
    startDate: Date

    @IsNotEmpty()
    endDate: Date

    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    projectId: string
}