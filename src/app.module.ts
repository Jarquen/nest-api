/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersController} from "./users/controllers/users.controller";
import {UsersService} from "./users/services/users.service";
import {User} from "./users/user.entity";
import {Project} from "./projects/project.entity";
import {ProjectUser} from "./project-users/project-user.entity";
import {Event} from "./events/event.entity";
import {UsersModule} from "./users/users.module";
import {ProjectsModule} from "./projects/projects.module";
import {ProjectUsersModule} from "./project-users/project-users.module";


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Project, ProjectUser, Event],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
      UsersModule,
      ProjectsModule,
      ProjectUsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
