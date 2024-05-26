import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import { UserRepository } from './user.repositories';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,) {}

  public async findAll(): Promise<User[]> {
      return await this.userRepository.findAll();
  }

  public async findById(userId: number): Promise<User> {
   
     try {

     return await this.userRepository.findById(userId);
     }
      catch (error) {
         throw new HttpException(error.message, error.status);
     }
  }

  public async createItem(createUserDto: CreateUserDto): Promise<User> {
    try {

      return await this.userRepository.createItem(createUserDto);
    } catch (error) {
        if (error.code=="23505"){
            throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
        }
        else{
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
  }

  public async updateById(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
      try {

          return this.userRepository.updateById(userId, updateUserDto);
      }
      catch (error){
          console.log(error)
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
  }



  public async deleteById(userId: number): Promise<void> {
    try {
        await this.userRepository.deleteById(userId);
    }
    catch (error){
        throw new HttpException(error.message,error.status)
    }
  }
}
