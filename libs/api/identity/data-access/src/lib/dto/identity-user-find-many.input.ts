import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class IdentityUserFindManyInput {
  @Field()
  username!: string
}
