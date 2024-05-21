import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './entities/createTaskDto';
import {TaskService} from "./task.service";
import {UpdateTaskDto} from "./entities/updateTaskDto";

@Controller('/api/v1/tasks')
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  public async findAll_task(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Get('/:Id')
  public async findById_task(@Param('Id') taskId: number): Promise<Task> {
  return await this.taskService.findById(taskId);
  }

  @Post()
  public async create_task(
      @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.taskService.createItem(createTaskDto);
  }

  @Patch('/:Id')
  public async update_task(
      @Body() updateTaskDto: UpdateTaskDto,
      @Param('Id') taskId: number,
  ): Promise<Task> {

    return await this.taskService.updateById(
        taskId,
        updateTaskDto,
    )
  }

  @Delete('/:Id')
  public async delete_task(@Param('Id') taskId: number): Promise<void> {
    await this.taskService.deleteById(taskId);
  }
}