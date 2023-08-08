import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Paging {
  @Field(() => Int, { nullable: true })
  count?: number
  @Field(() => Int, { nullable: true })
  skip?: number
  @Field(() => Int, { nullable: true })
  take?: number
  @Field(() => Int, { nullable: true })
  total?: number
}
