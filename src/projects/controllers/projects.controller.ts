import {Body, Controller, Get, Post} from "@nestjs/common";
import {ProjectsService} from "../services/projects.service";
import {CreateProjectDto} from "../dto/create-project.dto";
import {Project} from "../project.entity";

@Controller('projects/')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @Get()
    async findAll(): Promise<Project[]> {
        return await this.projectsService.findAll();
    }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        return await this.projectsService.create(createProjectDto)
    }
}