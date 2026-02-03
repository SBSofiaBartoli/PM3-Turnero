import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
    name: "credentials"
})
export class Credential {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50
    })
    username: string

    @Column()
    password: string

    @OneToOne(() => User, (user) => user.credential)
    user: User;
};
