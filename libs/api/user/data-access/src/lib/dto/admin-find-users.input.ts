import { Field, InputType, Int } from '@nestjs/graphql'
import { UserRole } from '../entity/user-role.entity'
import { UserStatus } from '../entity/user-status.entity'

@InputType()
export class AdminFindUsersInput {
  @Field({ nullable: true })
  search?: string
  @Field(() => UserRole, { nullable: true })
  role?: UserRole
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  take?: number
}
