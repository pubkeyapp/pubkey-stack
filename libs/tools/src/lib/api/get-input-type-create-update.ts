export function getInputTypeCreateUpdate(name: string, label: string) {
  return `import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ${name} {
  @Field(${label.endsWith('?') ? '{ nullable: true }' : ''})
  ${label}: string
}`
}
