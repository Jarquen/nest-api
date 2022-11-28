import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {Project} from "../project.entity";
import {CreateProjectDto} from "../dto/create-project.dto";
import {User} from "../../users/user.entity";

@Injectable()
export class ProjectsService {

    async findAll(): Promise<Project[]> {
        return Project.find({relations: ['referringEmployee']});
    }

    async findWhereIsConcern(id: string): Promise<Project[]> {
        return Project.find({where: {referringEmployeeId: id}, relations: ['referringEmployee']});
    }

    async findOne(id: string): Promise<Project> {
        const project = Project.findOne({where: {id: id}});
        if (!project) throw new NotFoundException('Invalid id');
        return project;
    }

    async findOneWhereIsConcern(id: string, employee: string): Promise<Project> {
        const project = Project.findOne({
            where: {id: id, referringEmployeeId: employee},
            relations: ['referringEmployeeId']
        });
        if (!project) throw new NotFoundException('Invalid id');
        return project;
    }

    async create(projectProps: CreateProjectDto): Promise<Project> {
        const {name, referringEmployeeId} = projectProps;

        const refEmployee: User = await User.findOne({where: {id: referringEmployeeId}});

        if (refEmployee.role !== "ProjectManager") {
            throw new UnauthorizedException("This employee is not project Manager")
        }

        const project = Project.create();
        project.name = name;
        project.referringEmployeeId = referringEmployeeId;
        await project.save();
        return project;
    }
}