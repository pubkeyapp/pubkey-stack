import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateEmailInput {
  @Field()
  email!: string
  @Field()
  ownerId!: string
}
