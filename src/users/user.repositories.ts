import {Repository, DataSource} from 'typeorm';
import { User } from "./entities/user.entity";
import { CreateUserDto } from './entities/createUserDto';
import { UpdateUserDto } from './entities/updateUserDto';
import {Injectable} from "@nestjs/common";
import {CustomBadDataException, CustomNotFoundException} from "../exception/userException";

@Injectable()
export class UserRepository extends Repository<User> {
     constructor(private dataSource: DataSource) {
         super(User, dataSource.createEntityManager());
     }

    public async findAll(): Promise<User[]> {
         let users=await this.find({})
        if (!users){
            throw new CustomNotFoundException();
        }
         return users
    }

    public async findById (userId: number): Promise<User> {
        let user = await this.findOne({ where: {id: userId} });
        if(!user){
            throw new CustomBadDataException(String(userId));
        }
        return user;
    }

    public async createItem( { username , password, role }: CreateUserDto): Promise<User> {

        if ( !username || !password || !role){
            throw new CustomBadDataException( username+" "+password+" "+role);
        }
        try {
            const user = this.create({username, password, role});
        }
        catch (e){
            throw new CustomBadDataException( e.message);
        }


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

