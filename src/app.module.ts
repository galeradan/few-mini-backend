import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    BlogsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
