import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { Injectable } from '@nestjs/common';
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

  public async createItem(userDto: CreateUserDto): Promise<User> {
    const user = this.create(userDto);

    return this.save(user);
  }

  public async updateById(
    userId: number,
    { username, password }: UpdateUserDto,
  ): Promise<number> {
    const update = await this.update(userId, {
      username: username,
      password: password,
    });
    return update.affected;
  }

  public async setRoleById(
    userId: number,
    userRole: UserRole,
  ): Promise<number> {
    const result = await this.update(userId, { role: userRole });
    return result.affected;
  }

  public async deleteById(userId: number): Promise<number> {
    const delet = await this.delete({ id: userId });
    return delet.affected;
  }
}
