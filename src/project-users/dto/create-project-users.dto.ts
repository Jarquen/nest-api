import {IsDate, IsNotEmpty} from "class-validator";

export class CreateProjectUsersDto {
    @IsNotEmpty()
    @IsDate()
    startDate: Date

    @IsNotEmpty()
    @IsDate()
    endDate: Date

    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    projectId: string
}