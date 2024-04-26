import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    Unique,
    ManyToMany,
    JoinTable
} from "typeorm"
import {Company} from "../company/company.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 16 ,unique: true})
    username: string

    @Column({ type: "varchar", length: 16})
    password:string

    @CreateDateColumn()
    created_at:Date

    @ManyToMany((type) => Company)
    @JoinTable()
    company_id: Company[]

}