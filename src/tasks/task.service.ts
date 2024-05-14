import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './entities/createTaskDto';
import { UpdateTaskDto } from './entities/updateTaskDto';
import { TaskRepository } from './task.repositories';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private   taskRepository: TaskRepository) {}

    public async  getAll(): Promise<Task[]> {
        return await this.taskRepository.findAll();
    }

    public async getByFilters (taskId: number): Promise<Task> {
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new NotFoundException(`Task #${taskId} not found`);
        }
        return task;
    }

    public async create(
        createTaskDto: CreateTaskDto,
    ): Promise<Task> {
        try {
            return await this.taskRepository.createItem(createTaskDto);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async updateById(
        taskId: number,
        updateTaskDto: UpdateTaskDto
    ): Promise<Task> {
        if (!await this.taskRepository.findById(taskId)) {
        throw new NotFoundException(`Task #${taskId} not found`);
    }
        const task = await this.taskRepository.updateById(taskId,updateTaskDto);

        return this.taskRepository.updateById(taskId, updateTaskDto);
    }

    public async deleteById(taskId: number): Promise<void> {
        const task = await this.getByFilters(taskId);
        if (!task) {
            throw new NotFoundException(`Task #${taskId} not found`);
        }
        await this.taskRepository.deleteById(taskId);
    }
}