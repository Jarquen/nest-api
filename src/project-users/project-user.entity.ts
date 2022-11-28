import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

@Entity()
export class ProjectUser extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column()
    projectId: string

    @Column()
    userId: string
}