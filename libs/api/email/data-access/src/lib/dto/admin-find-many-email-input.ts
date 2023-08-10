import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminFindManyEmailInput {
  @Field()
  ownerId!: string
}
