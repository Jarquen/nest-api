import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ProjectUser {
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