import { InputType } from '@nestjs/graphql'
import { IdentityUserLinkInput } from './identity-user-link-input'

@InputType()
export class IdentityRequestChallengeInput extends IdentityUserLinkInput {}
