import { ApiFeatureGeneratorSchema } from '../../generators/api-feature/api-feature-schema'

export function normalizeApiFeatureSchema(schema: ApiFeatureGeneratorSchema): ApiFeatureGeneratorSchema {
  return {
    app: schema.app ?? 'api',
    name: schema.name,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipUtil: schema.skipUtil ?? true,
  }
}
