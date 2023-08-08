import { Field, ObjectType } from '@nestjs/graphql'
import { UserRole } from './user-role.entity'
import { UserStatus } from './user-status.entity'

@ObjectType()
export class User {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
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
