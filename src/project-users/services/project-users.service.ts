import {ConflictException, Injectable} from "@nestjs/common";
import {ProjectUser} from "../project-user.entity";
import {CreateProjectUsersDto} from "../dto/create-project-users.dto";
import {User} from "../../users/user.entity";

@Injectable()
export class ProjectUsersService {
    async findAll(): Promise<ProjectUser[]> {
        return ProjectUser.find()
    }

    async findAllWhereConcerned(id: string): Promise<ProjectUser[]> {
        return ProjectUser.find({where: {userId: id}})
    }

    async create(projectUsersProps: CreateProjectUsersDto): Promise<ProjectUser> {
        const {startDate, endDate, userId, projectId} = projectUsersProps;

        const isAffected = await ProjectUser.findOne({where: {startDate: startDate, endDate: endDate}});

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