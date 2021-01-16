import { UseGuards } from "@nestjs/common";
import { Args, Context, Field, InputType, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "./auth.guard";
import { User } from "./user.entity";
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

@InputType()
export class LoginInput {
  @Field(() => String)
  username: string;
  @Field(() => String)
  password: string;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  error?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  error?: FieldError[];
  @Field(() => String, { nullable: true })
  accessToken?: string;
  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(()=>String)
  async testUser() {
    return 'Test User'
  }

  @Query(()=>User)
  @UseGuards(new AuthGuard)
  me(@Context('user') user: User ){
        return user;
  }
  

  @Mutation(() => UserResponse)
  async register(@Args('input') input: RegisterInput) {
    return this.userService.create(input);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('account') account: LoginInput) {
    return this.userService.login(account);
  }

}