import { Args, Field, InputType, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.entity";
import argon2 from 'argon2'
import { UsersService } from "./users.service";


@InputType()
export class RegisterInput {
  @Field(() => String)
  username: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  role: string; // converted from boolean to string: there might be more roles in the future - can be another relationship with another entity = Roles
}


@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(()=>String)
  async testUser() {
    return 'Test User'
  }

  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput) {
    return this.userService.create(input);
  }

}