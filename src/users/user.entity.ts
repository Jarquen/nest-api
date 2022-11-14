import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, Index} from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @Index({unique: true})
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Index({unique: true})
    @Column()
    username: string

    @Index({unique: true})
    @Column()
    email: string

    @Column()
    password: string

    @Column()
    role: 'Employee' | 'Admin' | 'ProjectManager' = 'Employee'
}