import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"

@Entity({
    name: "users"
})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100
    })
    name: string

    @Column({
        length: 100,
        unique: true
    })
    email: string

    @Column()
    birthdate: Date
    
    @Column("integer")
    nDni: number

    @OneToOne(() => Credential, (credential) => credential.user)
    @JoinColumn()
    credential: Credential;

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]
};
