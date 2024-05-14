import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete, NotFoundException,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './entities/createTaskDto';
import {TaskService} from "./task.service";
import {UpdateTaskDto} from "./entities/updateTaskDto";

@Controller('/api/v1/task')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  public async findAll(): Promise<Task[]> {
    return await this.taskService.getAll();
  }

  @Get('/:Id')
  public async findOne(@Param('Id') taskId: number): Promise<Task> {
  return await this.taskService.getByFilters(taskId);
  }

  @Post()
  public async create(
      @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.taskService.create(createTaskDto);
  }

  @Patch('/:Id')
  public async update(
      @Body() updateTaskDto: UpdateTaskDto,
      @Param('Id') taskId: number,
  ): Promise<Task> {

    return await this.taskService.updateById(
        taskId,
        updateTaskDto,
    )
  }

  @Delete('/:Id')
  public async delete(@Param('Id') taskId: number): Promise<void> {
    await this.taskService.deleteById(taskId);
  }
}