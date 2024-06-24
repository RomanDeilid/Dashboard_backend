import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { TaskRepository } from './task.repositories';
import { InjectRepository } from '@nestjs/typeorm';
import {TaskStatus} from "../enums/tasks";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  public async findAll(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  public async findById(taskId: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findById(taskId);
      if (!task) {
        throw new Error();
      }

      return task;
    } catch (error) {
      throw new HttpException(
        ` Bad request, task by ID=${taskId} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async createItem(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskRepository.createItem(createTaskDto);
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException(
          'Bad request, this task already exists',
          HttpStatus.BAD_REQUEST
        );
      }
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async setStatusById(
    taskId: number,
    status : TaskStatus
  ): Promise<void> {
    try {
      const setTask = await this.taskRepository.setStatusById(taskId, status);
      if (!setTask) {
        throw new Error();
      }
    } catch (error) {
      throw new HttpException(
        ` Bad request, task by ID=${taskId} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async updateById(
    taskId: number,
    updateTaskDto: UpdateTaskDto
  ): Promise<void> {
    try {
      const updateTask = await this.taskRepository.updateById(
        taskId,
        updateTaskDto
      );
      if (!updateTask) {
        throw new Error();
      }
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException(
          'Bad request, this task already exists',
          HttpStatus.BAD_REQUEST
        );
      }
        throw new HttpException(
          ` Bad request, task by ID=${taskId} not found`,
          HttpStatus.BAD_REQUEST
        );
    }
  }

  public async deleteById(taskId: number): Promise<void> {
    try {
      const deletedTask = await this.taskRepository.deleteById(taskId);
      if (!deletedTask) {
        throw new Error();
      }
    } catch (error) {
      throw new HttpException(
        `Bad request, task by ID=${taskId} not found`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
