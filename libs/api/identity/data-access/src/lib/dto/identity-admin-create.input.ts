import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '../entity/identity-provider.enum'

@InputType()
export class IdentityAdminCreateInput {
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field()
  ownerId!: string
}
