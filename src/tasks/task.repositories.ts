import { DataSource, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { Injectable } from '@nestjs/common';
import {Status} from "../enums/status";
import {Sheet} from "../sheets/entities/sheet.entity";

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  public async findAll(): Promise<Task[]> {
    return await this.find({});
  }

  public async findAllOneTopic(sheetId: number): Promise<Task[]> {
    const  response= await  this.createQueryBuilder('Task')
        .leftJoin('Task.sheet', 'sheet')
        .where('sheet.id = :id', { id: sheetId})
        .getMany();
    return response;
  }
  public async findById(taskId: number): Promise<Task> {
    return await this.findOne({ where: { id: taskId } });
  }

  public async createItem(taskDto: CreateTaskDto): Promise<Task> {
    const task = this.create(taskDto);

    return this.save(task);
  }

  public async updateById(
    taskId: number,
    { name, status, description,estimated_date,sheet}: UpdateTaskDto
  ): Promise<number> {
    const update = await this.update(taskId, {
      name:name,
      status: status,
      description: description,
      estimated_date: estimated_date,
      sheet: sheet
    });

    return update.affected;
  }

  public async setStatusById(
    taskId: number,
    taskStatus: Status
  ): Promise<number> {
    const result = await this.update(taskId, { status: taskStatus });

    return result.affected;
  }

  public async deleteById(taskId: number): Promise<number> {
    const delet = await this.delete({ id: taskId });

    return delet.affected;
  }
}
