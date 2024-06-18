import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { TaskService } from './task.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('/api/v1/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'просмотр всех задач' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  public async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @ApiOperation({ summary: 'просмотр одного задачи по ID' })
  @ApiResponse({ status: 200, type: Task })
  @Get('/:id')
  public async findById(@Param('id') taskId: number): Promise<Task> {
    return await this.taskService.findById(taskId);
  }

  @ApiOperation({ summary: 'создание задачи' })
  @ApiResponse({ status: 201, type: Task })
  @Post()
  public async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createItem(createTaskDto);
  }

  @ApiOperation({ summary: 'Обновления задачи по ID' })
  @ApiResponse({ status: 200 })
  @Put('/:id')
  public async updateById(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') taskId: number
  ): Promise<void> {
    await this.taskService.updateById(taskId, updateTaskDto);
  }

  @ApiOperation({ summary: 'Задать статус для задачи по ID' })
  @ApiResponse({ status: 200 })
  @Patch('/status/:id')
  public async setStatusById(
    @Body() {status}: UpdateTaskDto,
    @Param('id') taskId: number
  ): Promise<void> {
    await this.taskService.setStatusById(taskId, status);
  }

  @ApiOperation({ summary: 'удаление задачи по ID' })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  @HttpCode(204)
  public async deleteById(@Param('id') taskId: number): Promise<void> {
    await this.taskService.deleteById(taskId);
  }
}
