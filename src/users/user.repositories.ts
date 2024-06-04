import { DataSource, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRole } from '../enums/users';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async findAll(): Promise<User[]> {
    return await this.find({});
  }

  public async findById(userId: number): Promise<User> {
    return await this.findOne({ where: { id: userId } });
  }

  public async createItem({
    username,
    password,
  }: CreateUserDto): Promise<User> {
    // const role = UserRole.USER;
    const user = await this.create({ username, password });

    return this.save(user);
  }

  public async updateById(
    userId: number,
    { username, password }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne({ where: { id: userId } });
    user.username = username;
    user.password = password;
    await this.save(user);

    return user;
  }

  public async updateRoleById(userId: number): Promise<void> {
    const user = await this.update(userId, { role: UserRole.ADMIN });
  }

  public async deleteById(userId: number): Promise<void> {
    const user = await this.findOne({ where: { id: userId } });
    await this.remove(user);
  }
}
