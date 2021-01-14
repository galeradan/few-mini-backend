import { Query, Resolver } from "@nestjs/graphql";
import { Blog } from "./blog.entity";


@Resolver()
export class BlogsResolver {

  @Query(()=> [Blog])
  async blogs(): Promise<Blog[]>{
      return Blog.find();
  }

}