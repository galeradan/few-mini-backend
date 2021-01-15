import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blogs/blog.entity';
import { BlogsModule } from './blogs/blogs.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.modules';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context:({req})=>({headers: req.headers}),
      cors: {
        credentials: true,
        origin: true,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'few',
      entities: [Blog, User],
      synchronize: false,
    }),
    BlogsModule,
    UsersModule
  ],
})
export class AppModule {}
