import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserAdminCreateInput {
  @Field()
  username!: string
  @Field({ nullable: true })
  password?: string | undefined
}
