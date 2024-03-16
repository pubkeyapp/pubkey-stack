import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUserUpdateInput {
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  developer?: boolean
  @Field({ nullable: true })
  name?: string
}
