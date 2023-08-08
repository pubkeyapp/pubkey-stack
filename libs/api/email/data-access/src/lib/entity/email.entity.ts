import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Email {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date

  @Field({ nullable: true })
  private?: boolean

  @Field({ nullable: true })
  default?: boolean
  @Field({ nullable: true })
  verified?: boolean
  @Field()
  email!: string
}
