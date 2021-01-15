import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/users/auth.guard";
import { Blog } from "./blog.entity";


@Resolver()
export class BlogsResolver {

  @Query(()=> [Blog])
  @UseGuards(new AuthGuard)
  async blogs(): Promise<Blog[]>{
      return Blog.find();
  }

}