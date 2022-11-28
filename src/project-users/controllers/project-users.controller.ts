import {Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards} from "@nestjs/common";
import {ProjectUsersService} from "../services/project-users.service";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {ProjectUser} from "../project-user.entity";
import {CreateProjectUsersDto} from "../dto/create-project-users.dto";

@Controller('project-users')
export class ProjectUsersController {
    constructor(private projectUserService: ProjectUsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req): Promise<ProjectUser[]> {
        if (req.user.role === 'Admin' || req.user.role === 'ProjectManager') {
            return await this.projectUserService.findAll();
        } else {
            return await this.projectUserService.findAllWhereConcerned(req.user.id);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req, @Body() createProjectUser: CreateProjectUsersDto): Promise<ProjectUser> {
        if (req.user.role === 'Admin' || req.user.role === 'ProjectManager') {
            return await this.projectUserService.create(createProjectUser);
        } else {
            throw new UnauthorizedException("You don't have the permissions to do this");
        }
    }
}