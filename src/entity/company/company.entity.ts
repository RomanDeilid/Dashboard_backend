import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, ManyToMany, JoinTable} from "typeorm"
import {User} from "../user/user.entity";

@Entity()
export class Company {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 16})
    name: string

    @Column({ type: "varchar", length: 255})
    description: string
    
}