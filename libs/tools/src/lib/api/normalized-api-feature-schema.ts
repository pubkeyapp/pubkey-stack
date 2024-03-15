import type { ApiFeatureGeneratorSchema } from '../../generators/api-feature/api-feature-schema'

export interface NormalizedApiFeatureSchema extends Omit<ApiFeatureGeneratorSchema, 'crud'> {
  app: string
  crud: string[]
  label: string
  model: string
  modelOwner: string
  npmScope: string
  skipDataAccess: boolean
  skipFeature: boolean
  skipUtil: boolean
}
