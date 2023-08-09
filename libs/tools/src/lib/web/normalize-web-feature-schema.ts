import { Inflectors } from 'en-inflectors'
import { NormalizedWebFeatureSchema, WebFeatureGeneratorSchema } from '../../generators/web-feature/web-feature-schema'

export function normalizeWebFeatureSchema(schema: WebFeatureGeneratorSchema): NormalizedWebFeatureSchema {
  const modelName = schema.name
  const pluralModelName = new Inflectors(modelName).toPlural().toLowerCase()

  return {
    app: schema.app ?? 'web',
    name: schema.name,
    label: schema.label ?? 'name',
    modelName,
    pluralModelName,
    skipAdminCrud: schema.skipAdminCrud ?? false,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipUi: schema.skipUi ?? false,
  }
}
