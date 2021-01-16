import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'blogs' })
export class Blog extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => Int)
  @Column()
  views: number;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => String)
  @Column()
  publishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt = new Date();
}
