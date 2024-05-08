import {Company} from "../../companies/company.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 16 ,unique: true})
    username: string

    @Column({ type: "varchar", length: 16})
    password:string

    @Column({ type: "varchar", length: 5})
    role:string

    @CreateDateColumn()
    created_at:Date



    @ManyToMany((type) => Company)
    @JoinTable()
    company: Company[]

}