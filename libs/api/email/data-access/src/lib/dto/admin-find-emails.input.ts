import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminFindEmailsInput {
  @Field()
  ownerId!: string
}
