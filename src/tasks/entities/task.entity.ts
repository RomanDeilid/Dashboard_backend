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
import { Sheet } from '../../sheets/entities/sheet.entity';
import {ApiProperty} from "@nestjs/swagger";
import { TaskStatus } from '../../enums/tasks';
@Unique(['name', 'sheet'])
@Entity()
export class Task {

  @ApiProperty({ example: '1', description: ' уникальное идефикатор ' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'add logo', description: 'имя задачи' })
  @Column({ type: 'varchar', length: 32 })
  name: string;

  @ApiProperty({ example: 'Todo', description: 'статус задачи' })
  @Column({ type: "enum",enum: TaskStatus, default: TaskStatus.TODO })
  status: string;

  @ApiProperty({ example: 'убери пробелы', description: ' описание задачи' })
  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ApiProperty({
    example: '23.05.2024',
    description: 'Крайний срок для выполнения задачи',
  })
  @Column()
  estimated_date: Date;

  @ApiProperty({
    example: '23.05.2024',
    description: 'Дата создания задачи',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    example: '23.05.2024',
    description: 'Дата обновления задачи',
  })
  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'sheet_id' })
  @ManyToOne(() => Sheet)
  sheet: Sheet;
}
