import {
    BadRequestException,
    Body,
    Controller, ForbiddenException,
    Get, NotFoundException,
    Param,
    Post,
    Req,
    UnauthorizedException,
    UseGuards
} from "@nestjs/common";
import {ProjectsService} from "../services/projects.service";
import {CreateProjectDto} from "../dto/create-project.dto";
import {Project} from "../project.entity";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {isUUID} from "class-validator";

@Controller('projects/')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(@Req() req): Promise<Project[]> {
        if (req.user.role === 'Admin' || req.user.role === 'ProjectManager') {
            return await this.projectsService.findAll();
        } else {
            return await this.projectsService.findWhereIsConcern(req.user.id);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req, @Body() createProjectDto: CreateProjectDto) {
        if (req.user.role === 'Admin') {
            return await this.projectsService.create(createProjectDto);
        } else {
            throw new UnauthorizedException("You don't have the authorization");
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Req() req, @Param('id') id: string) {
        if (!isUUID(id)) throw new BadRequestException('Invalid id uuid');
        if (req.user.role === 'Admin' || req.user.role === 'ProjectManager') {
            const projectService = await this.projectsService.findOne(id);
            if (projectService !== null) {
                return projectService;
            } else {
                throw new NotFoundException("This project don't exist");
            }
        } else {
            return await this.projectsService.findProjectUser(req.user.id, id);
        }
    }
}