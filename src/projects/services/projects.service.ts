import {ForbiddenException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {Project} from "../project.entity";
import {CreateProjectDto} from "../dto/create-project.dto";
import {User} from "../../users/user.entity";
import {ProjectUser} from "../../project-users/project-user.entity";
import {Any, In} from "typeorm";

@Injectable()
export class ProjectsService {

    async findAll(): Promise<Project[]> {
        return Project.find({relations: ['referringEmployee']});
    }

    async findWhereIsConcern(id: string): Promise<Project[]> {
        const projectUser = await ProjectUser.find({select: {projectId: true}, where: {userId: id}});

        const projectId = [];
        projectUser.map((id) => projectId.push(id.projectId));

        return await Project.findBy({id: In(projectId)});

        // let projectId = []
        // const result = []
        //
        // const projectUser = await ProjectUser.find({where: {userId: id}})
        //
        // if (projectUser) projectUser.forEach((projectUser) => projectId.push(projectUser.projectId))
        //
        // for (const id of projectId) {
        //     const project = await Project.find({where: {id: id}, relations: ['referringEmployee']});
        //     result.push(project);
        // }
        //
        // console.log(result, projectUser)
        // return result[0];
    }

    async findProjectUser(userId: string, projectId: string) {
        const projectUser = await ProjectUser.findOne({where: {userId: userId, projectId: projectId}})
        if (projectUser) {
            const result = await Project.find({where: {id: projectId}})
            return result[0]
        } else {
            throw new ForbiddenException("user not in the project")
        }
    }

    async findOne(id: string): Promise<Project> {
        const project = Project.findOne({where: {id: id}});
        if (!project) throw new NotFoundException('Invalid id');
        return project;
    }

    async findOneWhereIsConcern(id: string, employee: string): Promise<Project> {
        const project = Project.findOne({
            where: {id: id, referringEmployeeId: employee},
            relations: ['referringEmployee']
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