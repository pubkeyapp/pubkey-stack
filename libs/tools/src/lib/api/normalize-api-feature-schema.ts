import { Inflectors } from 'en-inflectors'
import { ApiFeatureGeneratorSchema, NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'

export function normalizeApiFeatureSchema(schema: ApiFeatureGeneratorSchema): NormalizedApiFeatureSchema {
  const modelName = schema.name
  const pluralModelName = new Inflectors(modelName).toPlural().toLowerCase()

  return {
    app: schema.app ?? 'api',
    name: schema.name,
    label: schema.label ?? 'name',
    modelName,
    pluralModelName,
    skipAdminCrud: schema.skipAdminCrud ?? false,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipSdk: schema.skipSdk ?? false,
    skipUtil: schema.skipUtil ?? true,
  }
}
