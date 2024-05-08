import {Repository, EntityRepository, DataSource} from 'typeorm';

import { User } from "./entities/user.entity";
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import {Injectable} from "@nestjs/common";
@Injectable()
export class UserRepository extends Repository<User> {
     constructor(private dataSource: DataSource) {
         super(User, dataSource.createEntityManager());
     }

// EntityRepository(User)
// export class UserRepository extends Repository<User> {
//     constructor(private dataSource: DataSource) {
//         super(User, dataSource.createEntityManager());
//     }
// export class UserRepository extends Repository<User> {

    public async findAll(): Promise<User[]> {
        console.log("Repository")
        console.log(this)
        console.log(this.find({}))
        return await this.find({});
    }

    public async findById (userId: number): Promise<User> {

        return await this.findOne({ where: {id: userId} });
    }

    public async createItem( createProductDto: CreateUserDto): Promise<User> {
        const { username , password, role } = createProductDto;
        const user = new User();
        user.username = username;
        user.password = password;
        user.role = role;
        await this.save(user);
        return user;
    }

    public async updateById(userId: number, updateUserDto: UpdateUserDto,): Promise<User> {
        const { username, password, role } = updateUserDto;
        const product = await this.findOne({ where: {id: userId} });
        product.username = username;
        product.password = password;
        product.role = role;
        await this.save(product);

        return product;
    }

    public async deleteById (userId: number): Promise<void> {
        const user = await this.findOne({ where: {id: userId} });
        await this.remove(user);
    }
}

