import { ApiCrudGeneratorSchema } from '../../generators/api-crud/api-crud-schema'
import { PrismaModelField } from '../prisma/get-prisma-models'

export interface NormalizedApiCrudSchema extends ApiCrudGeneratorSchema {
  label: string
  npmScope: string
  fields?: PrismaModelField[]
  modelOwner: string
  modelOwnerProperty: string
}
