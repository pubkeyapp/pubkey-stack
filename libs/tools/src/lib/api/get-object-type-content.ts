export function getObjectTypeContent(name: string, label: string) {
  return `import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ${name} {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field()
  ${label}!: string
}`
}
