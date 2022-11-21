import {Injectable} from "@nestjs/common";
import {Project} from "../project.entity";
import {CreateProjectDto} from "../dto/create-project.dto";

@Injectable()
export class ProjectsService {

    async findAll() {
        const projects = Project.find();
        return projects;
    }

    async create(projectProps: CreateProjectDto) {
        const {name, referringEmployeeId} = projectProps;

        const project = Project.create();
        project.name = name;
        project.referringEmployeeId = referringEmployeeId;
        await project.save();
        return project;
    }
}