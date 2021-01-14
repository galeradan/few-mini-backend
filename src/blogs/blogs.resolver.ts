import { Query, Resolver } from "@nestjs/graphql";


@Resolver()
export class BlogsResolver {

  @Query(()=>String)
  async test() {
    return 'Test GraphQL'
  }

}