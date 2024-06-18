import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';

import { Company } from '../../companies/entities/company.entity';
import {ApiProperty} from "@nestjs/swagger";
@Unique(['name', 'company'])
@Entity()
export class Sheet {
  @ApiProperty({ example: '1', description: ' уникальное идефикатор ' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'Roma', description: 'имя доски' })
  @Column({ type: 'varchar', length: 32})
  name: string;

  @ApiProperty({ example: 'Задача по фронт для Ромы', description: 'описание доски задач' })
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ApiProperty({
    example: '23.05.2024',
    description: 'Дата создания доски ',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '23.05.2024',
    description: 'Дата обновления доски',
  })
  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'company_id' })
  @ManyToOne(() => Company)
  company: Company;
}
