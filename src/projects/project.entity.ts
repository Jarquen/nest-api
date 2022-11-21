import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

@Entity()
export class Project extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column('uuid')
    referringEmployeeId: string
}