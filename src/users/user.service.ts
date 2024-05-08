import {HttpException, HttpStatus, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import { UserRepository } from './user.repositories';
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private   userRepository: UserRepository) {}


    public async findAll(): Promise<User[]> {
        // console.log("Service")
        return await this.userRepository.findAll();
    }

    public async findOne(userId: number): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return user;
    }

    public async create(
        createUserDto: CreateUserDto,
    ): Promise<User> {
        try {
            return await this.userRepository.createItem(createUserDto);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async update(
        userId: number,
        updateUserDto: UpdateUserDto
    ): Promise<User> {
        const user = await this.userRepository.updateById(userId,updateUserDto);
        if (!user) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return this.userRepository.updateById(userId, updateUserDto);
    }

    public async remove(userId: number): Promise<void> {
        await this.userRepository.deleteById(userId);
    }
}