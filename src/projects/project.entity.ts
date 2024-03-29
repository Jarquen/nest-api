import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne, Index} from 'typeorm';
import {User} from "../users/user.entity";

@Entity()
export class Project extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    @Index({unique: true})
    id: string

    @Column()
    name: string

    @Column('uuid')
    referringEmployeeId: string

    @ManyToOne(() => User)
    @JoinColumn()
    referringEmployee: User
}