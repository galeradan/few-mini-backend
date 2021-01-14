import { Module } from '@nestjs/common';
import { BlogsResolver } from './blogs.resolver';

@Module({
  providers: [BlogsResolver],
})
export class BlogsModule {}
