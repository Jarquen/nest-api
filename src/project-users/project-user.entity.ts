import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import {User} from "../users/user.entity";
import {Project} from "../projects/project.entity";

@Entity()
export class ProjectUser extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column()
    projectId: string

    @ManyToOne(() => Project)
    @JoinColumn()
    project = Project

    @Column()
    userId: string

    @ManyToOne(() => User)
    @JoinColumn()
    user: User
}