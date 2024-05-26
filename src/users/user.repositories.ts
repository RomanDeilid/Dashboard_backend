import { Repository, DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async findAll(): Promise<User[]> {
    const users = await this.find({});

    return users;
  }

  public async findById(userId: number): Promise<User> {
    const user = await this.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException(` Bad request, user by ID=${userId} not found`, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  public async createItem({
    username,
    password,
    role,
  }: CreateUserDto): Promise<User> {

    const user=await this.create({ username, password, role });
    if(!(role=="Admin" || role=="User") ){
      throw new HttpException(` Bad request, incorrect role="${role}" allowed("Admim","User")`, HttpStatus.BAD_REQUEST);
    }

    return this.save(user);
  }

  public async updateById(
    userId: number,
    { username, password, role }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne({ where: { id: userId } });
    if(!user){
      throw new HttpException(` Bad request, user by ID=${userId} not found`, HttpStatus.BAD_REQUEST);
    }
    if(!(await this.count({where: {username:username}})==1 && user.username==username)){
      throw new HttpException(` Bad request, user name="${username}" engaged`, HttpStatus.BAD_REQUEST);
    }
    user.username = username;
    user.password = password;
    user.role = role;
    if(!(role=="Admin" || role=="User") ){
      throw new HttpException(` Bad request, incorrect role="${role}" allowed("Admim","User")`, HttpStatus.BAD_REQUEST);
    }

    // await  this.update({id:userId},{username:username,password:password,role:role})
    await this.save(user);

    return user;
  }

  public async deleteById(userId: number): Promise<void> {
    const user = await this.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException(` Bad request, user by ID=${userId} not found`, HttpStatus.BAD_REQUEST);
    }
    await this.remove(user);
  }
}
