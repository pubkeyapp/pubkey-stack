import { WebFeatureGeneratorSchema } from '../../generators/web-feature/web-feature-schema'

export interface NormalizedWebFeatureSchema extends Omit<WebFeatureGeneratorSchema, 'crud'> {
  app: string
  crud: string[]
  label: string
  model: string
  modelOwner: string
  npmScope: string
  skipDataAccess: boolean
  skipFeature: boolean
  skipUi: boolean
}
