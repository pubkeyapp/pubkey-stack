export function getInputTypeFindMany(name: string) {
  return `import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ${name} {
  @Field({ nullable: true })
  search?: string
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  take?: number
}`
}
