import {Module} from "@nestjs/common";
import {ProjectsService} from "./services/projects.service";
import {ProjectsController} from "./controllers/projects.controller";
import {UsersModule} from "../users/users.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Project} from "./project.entity";
import {ProjectUsersModule} from "../project-users/project-users.module";

@Module({
    imports: [TypeOrmModule.forFeature([Project]), UsersModule, ProjectUsersModule],
    providers: [ProjectsService],
    controllers: [ProjectsController],
    exports: [ProjectsService],
})
export class ProjectsModule {
}