import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as uuid from 'uuid';
import { User } from './user.entity';
import { RegisterInput, UserResponse } from './users.resolver';
const argon2 = require('argon2');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(input: RegisterInput): Promise<User | UserResponse> {
    const isExist = await this.userRepository.findOne({username: input.username})

    if(!isExist){
        const user = new User();
        const hashedPassword = await argon2.hash(input.password);
        user.id = uuid.v4();
        user.username = input.username;
        user.password = hashedPassword;
        user.role = input.role;
        this.userRepository.save(user);
        return {
            user
        }
    }
    return {
        error: [
          {
            field: 'username',
            message: 'username already exists, please use another one'
          }
        ]
      };

  }
}