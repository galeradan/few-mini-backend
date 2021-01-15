import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/users/auth.guard";
import { User } from "src/users/user.entity";
import { Blog } from "./blog.entity";


@Resolver()
export class BlogsResolver {

  @Query(()=> [Blog])
  @UseGuards(AuthGuard)
  async blogs(@Context('user') user: User): Promise<Blog[]>{
      if(user.role == 'admin'){
        return Blog.find();
      }else{
        return Blog.find({status: 'published'})
      }
     
  }

}