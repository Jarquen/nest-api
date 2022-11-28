import {Module} from "@nestjs/common";
import {ProjectUsersService} from "./services/project-users.service";
import {ProjectUsersController} from "./controllers/project-users.controller";

@Module({
    providers: [ProjectUsersService],
    controllers: [ProjectUsersController],
    exports: [ProjectUsersService]
})
export class ProjectUsersModule {}