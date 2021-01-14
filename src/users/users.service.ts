import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';
import { LoginInput, LoginResponse, RegisterInput, UserResponse } from './users.resolver';
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

  async createToken({id, username}: User){
     return jwt.sign({id, username}, 'temporarysecret')
  }

  async login(account: LoginInput): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({username: account.username})
    if(!user){
        return {
            error: [
              {
                field: 'email',
                message: 'email does not exists'
              }
            ]
          };
    }
    const valid = await argon2.verify(user.password, account.password);
    if(!valid){
        return {
            error: [
              {
                field: 'password',
                message: 'password is incorrect'
              }
            ]
          };
    }
    const accessToken = await this.createToken(user)
    return {
        accessToken
    };
  }

  async create(input: RegisterInput): Promise<UserResponse> {
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