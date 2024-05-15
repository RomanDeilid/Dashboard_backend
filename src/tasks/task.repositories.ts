import {Repository, DataSource} from 'typeorm';
import { Task} from "./entities/task.entity";
import { CreateTaskDto } from './entities/createTaskDto';
import { UpdateTaskDto } from './entities/updateTaskDto';
import {Injectable} from "@nestjs/common";

@Injectable()
export class TaskRepository extends Repository<Task> {
     constructor(private dataSource: DataSource) {
         super(Task, dataSource.createEntityManager());
     }

    public async findAll(): Promise<Task[]> {
        return await this.find({});
    }

    public async findById (taskId: number): Promise<Task> {
        return await this.findOne({ where: {id: taskId} });
    }

    public async createItem( {name, status, description }: CreateTaskDto): Promise<Task> {
        const task = this.create({name, status, description});
        await this.save(task);
        return task;
    }

    public async updateById(userId: number, { name, status, description }: UpdateTaskDto,): Promise<Task> {
        const task = await this.findOne({ where: {id: userId} });
        task.name = name;
        task.status = status;
        task.description = description;
        await this.save(task);
        return task;
    }

    public async deleteById (taskId: number): Promise<void> {
        const task = await this.findOne({ where: {id: taskId} });
        await this.remove(task);
    }
}

