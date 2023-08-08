import { Field, InputType } from '@nestjs/graphql'
import { UserRole } from '../entity/user-role.entity'
import { UserStatus } from '../entity/user-status.entity'

@InputType()
export class AdminUpdateUserInput {
  @Field(() => UserRole, { nullable: true })
  role?: UserRole
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  developer?: boolean
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  username?: string
}
