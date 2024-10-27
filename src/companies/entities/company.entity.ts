import {
  Entity,
  PrimaryGeneratedColumn,
  Column, ManyToMany, JoinTable,
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/entities/user.entity";

@Entity()
export class Company {

  @ApiProperty({example: '1', description: ' уникальное идефикатор '})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({example: 'R-Game', description: ' уникальное имя компании'})
  @Column({type: 'varchar', length: 16})
  name: string;

  @ApiProperty({example: 'компания для создания игрушек', description: 'описание'})
  @Column({type: 'varchar', length: 255})
  description: string;

  @ManyToMany(() => User, user => user.companies)
  // @JoinTable()
  users: User[];
}