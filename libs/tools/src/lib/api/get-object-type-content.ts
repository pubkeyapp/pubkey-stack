export function getObjectTypeContent(name: string, label: string) {
  return `import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ${name} {
  @Field()
  ${label}!: string
}`
}
