import { Tree } from '@nx/devkit'
import { NormalizedWebFeatureSchema, WebFeatureGeneratorSchema } from '../../generators/web-feature/web-feature-schema'

export function normalizeWebFeatureSchema(tree: Tree, schema: WebFeatureGeneratorSchema): NormalizedWebFeatureSchema {
  const modelName = schema.name
  const npmScope = tree.read('nx.json', 'utf-8')?.match(/"npmScope": "(.*)"/)?.[1]

  return {
    app: schema.app ?? 'web',
    name: schema.name,
    label: schema.label ?? 'name',
    modelName,
    npmScope,
    skipAdminCrud: schema.skipAdminCrud ?? false,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipUi: schema.skipUi ?? false,
  }
}
