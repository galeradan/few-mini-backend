import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  UserResponse,
} from './users.resolver';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  // finds all user
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // creates a token that expires in 12hrs
  async createToken({ id, username, role }: User) {
    return jwt.sign({ id, username, role }, `${process.env.SECRET}`, {
      expiresIn: '12h',
    });
  }

  // Logins the users and returns user details and a token that will be use for AuthGuard Protected resource
  async login(account: LoginInput): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      username: account.username,
    });
    if (!user) {
      return {
        error: [
          {
            field: 'username',
            message: 'username does not exists',
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, account.password);
    if (!valid) {
      return {
        error: [
          {
            field: 'password',
            message: 'password is incorrect',
          },
        ],
      };
    }
    const accessToken = await this.createToken(user);
    return {
      accessToken,
      user,
    };
  }

  // registers a user and uses argon2 to hash the password
  async create(input: RegisterInput): Promise<UserResponse> {
    const isExist = await this.userRepository.findOne({
      username: input.username,
    });

    if (!isExist) {
      const user = new User();
      const hashedPassword = await argon2.hash(input.password);
      user.id = uuid.v4();
      user.username = input.username;
      user.password = hashedPassword;
      user.role = input.role;
      this.userRepository.save(user);
      return {
        user,
      };
    }
    return {
      error: [
        {
          field: 'username',
          message: 'username already exists, please use another one',
        },
      ],
    };
  }
}
