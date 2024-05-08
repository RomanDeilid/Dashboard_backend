import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Unique, JoinColumn
} from "typeorm"

import {Company} from "../companies/company.entity";
@Unique(["name", "company"])
@Entity()
export class Sheet {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ type: "varchar", length: 32})
    name: string

    @Column({ type: "varchar", length: 255})
    description: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @JoinColumn({name: "company_id"})
    @ManyToOne(() => Company)
    company: Company
}

