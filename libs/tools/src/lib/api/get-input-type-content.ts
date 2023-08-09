export function getInputTypeContent(name: string, label: string) {
  return `import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ${name} {
  @Field()
  ${label}!: string
}`
}
