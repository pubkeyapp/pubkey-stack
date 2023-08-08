import { Inflectors } from 'en-inflectors'
import { ApiFeatureGeneratorSchema } from '../../generators/api-feature/api-feature-schema'

export function normalizeApiFeatureSchema(schema: ApiFeatureGeneratorSchema): ApiFeatureGeneratorSchema {
  const modelName = schema.name
  const pluralModelName = new Inflectors(modelName).toPlural().toLowerCase()

  return {
    app: schema.app ?? 'api',
    name: schema.name,
    modelName,
    pluralModelName,
    skipAdminCrud: schema.skipAdminCrud ?? false,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipUtil: schema.skipUtil ?? true,
  }
}
