import { Field, InputType, Int } from '@nestjs/graphql'
import { UserRole } from '../entity/user-role.enum'
import { UserStatus } from '../entity/user-status.enum'

@InputType()
export class AdminFindManyUserInput {
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
