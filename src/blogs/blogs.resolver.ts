import { Query, Resolver } from "@nestjs/graphql";
import { Blog } from "./blog.entity";


@Resolver()
export class BlogsResolver {

  @Query(()=>String)
  async test() {
    return 'Test GraphQL'
  }

  @Query(()=> [Blog])
  async blogs(): Promise<Blog[]>{
      return Blog.find();
  }

}