import {Repository, DataSource} from 'typeorm';
import { User } from "./entities/user.entity";
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserRepository extends Repository<User> {
     constructor(private dataSource: DataSource) {
         super(User, dataSource.createEntityManager());
     }

    public async findAll(): Promise<User[]> {
        return await this.find({});
    }

    public async findById (userId: number): Promise<User> {
        return await this.findOne({ where: {id: userId} });
    }

    public async createItem( { username , password, role }: CreateUserDto): Promise<User> {
        const user = this.create({username, password, role});
        await this.save(user);
        return user;
    }

    public async updateById(userId: number, { username , password, role }: UpdateUserDto,): Promise<User> {
        const user = await this.findOne({ where: {id: userId} });
        user.username = username;
        user.password = password;
        user.role = role;
        await this.save(user);
        return user;
    }

    public async deleteById (userId: number): Promise<void> {
        const user = await this.findOne({ where: {id: userId} });
        await this.remove(user);
    }
}

