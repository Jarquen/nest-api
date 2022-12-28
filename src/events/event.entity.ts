import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import {User} from "../users/user.entity";

@Entity()
export class Event extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    date: Date

    @Column()
    eventStatus: 'Pending' | 'Accepted' | 'Declined' = 'Pending'

    @Column()
    eventType: 'RemoteWork' | 'PaidLeave'

    @Column()
    eventDescription: string

    @Column()
    userId: string

    @ManyToOne(() => User)
    @JoinColumn()
    user: User
}