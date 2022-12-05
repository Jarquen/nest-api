import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {ProjectUser} from "../project-user.entity";
import {CreateProjectUsersDto} from "../dto/create-project-users.dto";
import {User} from "../../users/user.entity";
import {Project} from "../../projects/project.entity";

@Injectable()
export class ProjectUsersService {
    async findAll(): Promise<ProjectUser[]> {
        return ProjectUser.find({relations: ['user', 'project']})
    }

    async findAllWhereConcerned(id: string): Promise<ProjectUser[]> {
        return ProjectUser.find({where: {userId: id}, relations: ['user', 'project']})
    }

    async findOne(id: string): Promise<ProjectUser> {
        return ProjectUser.findOne({where: {id: id}, relations: ['user', 'project']})
    }

    async findOneWhereConcerned(id: string, userId: string): Promise<ProjectUser> {
        return ProjectUser.findOne({where: {id: id, userId: userId}, relations: ['user', 'project']})
    }

    async create(projectUsersProps: CreateProjectUsersDto): Promise<ProjectUser> {
        const {startDate, endDate, userId, projectId} = projectUsersProps;

        const isAffected = await ProjectUser.findOne({where: {userId: userId}});

        const project = await Project.findOne({where: {id: projectId}});
        if (project === null) throw new NotFoundException("This project don't exist");

        const user = await User.findOne({where: {id: userId}});
        if (user === null) throw new NotFoundException("This user don't exist");

        // console.log(isAffected)

        // if (isAffected.startDate > startDate && isAffected.endDate < endDate) {
        //     throw new ConflictException("This user is already on an other project");
        // }
        // else if (isAffected.startDate.getDate() > startDate.getDate() && isAffected.endDate.getDate() > endDate.getDate()){
        //     throw new ConflictException("This user is already on an other project");
        // }
        // else if (isAffected.startDate.getDate() === startDate.getDate() && isAffected.endDate.getDate() === endDate.getDate()) {
        //     throw new ConflictException("This user is already on an other project");
        // }

        if (isAffected) throw new ConflictException("This user is already on an other project");

        const projectUser = ProjectUser.create();
        projectUser.startDate = startDate;
        projectUser.endDate = endDate;
        projectUser.userId = userId;
        projectUser.projectId = projectId;
        await projectUser.save();

        return projectUser;
    }
}