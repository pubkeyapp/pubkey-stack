import { Tree } from '@nx/devkit'
import { ApiFeatureGeneratorSchema, NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'

export function normalizeApiFeatureSchema(tree: Tree, schema: ApiFeatureGeneratorSchema): NormalizedApiFeatureSchema {
  const modelName = schema.name
  const npmScope = tree.read('nx.json', 'utf-8')?.match(/"npmScope": "(.*)"/)?.[1]

  return {
    app: schema.app ?? 'api',
    name: schema.name,
    label: schema.label ?? 'name',
    modelName,
    npmScope,
    skipAdminCrud: schema.skipAdminCrud ?? false,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipSdk: schema.skipSdk ?? false,
    skipUtil: schema.skipUtil ?? true,
  }
}
