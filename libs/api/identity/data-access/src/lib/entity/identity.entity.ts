import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { User } from '@pubkey-stack/api-user-data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { IdentityChallenge } from './identity-challenge.entity'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class Identity {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date
  @Field(() => Int)
  order!: number
  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
  @Field({ nullable: true })
  name?: string
  @Field(() => GraphQLJSON, { nullable: true })
  profile?: JSON
  @Field({ nullable: true })
  verified?: boolean
  @Field(() => User, { nullable: true })
  owner?: User
  @Field(() => [IdentityChallenge], { nullable: true })
  challenges?: IdentityChallenge[]
  @HideField()
  accessToken?: string
  @HideField()
  refreshToken?: string
}
