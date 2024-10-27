import { Company } from '../../companies/entities/company.entity';
import {
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../enums/users';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: ' уникальное идефикатор ' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Roma', description: ' уникальное имя пользователя' })
  @Column({ type: 'varchar', length: 16, unique: true })
  username: string;

  @ApiProperty({ example: 'Xyz1723', description: 'Пароль' })
  @Column({ type: 'varchar', length: 256, nullable:false })
  password: string;

  @ApiProperty({
    example: 'Admin',
    description: 'Роль пользователя (Admin, User)',
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty({
    example: '23.05.2024',
    description: 'Дата создания пользователя',
  })
  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Company, company => company.users,{ cascade: true })
  @JoinTable()
  companies: Company[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }
}


