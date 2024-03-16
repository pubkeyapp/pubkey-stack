import { Field, InputType } from '@nestjs/graphql'
import { IdentityProvider } from '../entity/identity-provider.enum'

@InputType()
export class IdentityUserLinkInput {
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
}
