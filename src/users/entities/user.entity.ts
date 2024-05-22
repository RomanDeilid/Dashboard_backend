import { Company } from '../../companies/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class User {
  @ApiProperty({example:"1",description:" уникальное идефикатор "})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example:"Roma",description:" уникальное имя пользователя"})
  @Column({ type: 'varchar', length: 16, unique: true })
  username: string;

  @ApiProperty({example:"Xyz1723",description:"Пароль"})
  @Column({ type: 'varchar', length: 16 })
  password: string;

  @ApiProperty({example:"Admin",description:"Роль пользователя (Admin, User)"})
  @Column({ type: 'varchar', length: 5 })
  role: string;

  @ApiProperty({example:"23.05.2024",description:"Дата создания пользователя"})
  @CreateDateColumn()
  created_at: Date;

  @ManyToMany((type) => Company)
  @JoinTable()
  company: Company[];
}
