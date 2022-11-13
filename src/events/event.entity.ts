import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
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
}