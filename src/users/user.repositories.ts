import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
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
  public async setRoleById(userId: number): Promise<number> {
    const set = await this.update(userId, { role: UserRole.ADMIN });
    return set.affected;
  }

  public async deleteById(userId: number): Promise<number> {
    const delet = await this.delete({ id: userId });
    return delet.affected;
  }
}
