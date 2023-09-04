import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateEmailInput {
  @Field({ nullable: true })
  private?: boolean
  @Field({ nullable: true })
  default?: boolean
  @Field({ nullable: true })
  verified?: boolean
  @Field({ nullable: true })
  email?: string
}
