import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-stack/api-core-data-access'
import { UserRole } from '../entity/user-role.enum'
import { UserStatus } from '../entity/user-status.enum'

@InputType()
export class UserAdminFindManyInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
  @Field(() => UserRole, { nullable: true })
  role?: UserRole
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus
}
