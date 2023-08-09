import { names } from '@nx/devkit'

export function getFindManyHelper(name: string, inputClass: string, inputName: string, modelName: string) {
  const { className, propertyName } = names(name)
  const fileName = names(inputName).fileName
  const modelClassName = names(modelName).className
  const interfaceName = `${className}Parsed`

  return `import { Prisma } from '@prisma/client'
import { ${inputClass} } from '../dto/${fileName}'

export interface ${interfaceName} {
  orderBy: Prisma.${modelClassName}OrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.${modelClassName}WhereInput
}

export function ${propertyName}(input: ${inputClass}): ${interfaceName} {
  return {
    where: getWhereInput(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { name: 'asc' },
  }
}

function getWhereInput(input: ${inputClass}): Prisma.${modelClassName}WhereInput {
  const where: Prisma.${modelClassName}WhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
`
}
