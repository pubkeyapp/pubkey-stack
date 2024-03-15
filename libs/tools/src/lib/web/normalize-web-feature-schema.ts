import { Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { WebFeatureGeneratorSchema } from '../../generators/web-feature/web-feature-schema'
import { NormalizedWebFeatureSchema } from './normalized-web-feature-schema'

export function normalizeWebFeatureSchema(tree: Tree, schema: WebFeatureGeneratorSchema): NormalizedWebFeatureSchema {
  const model = schema.model
  const npmScope = getNpmScope(tree)

  return {
    app: schema.app ?? 'web',
    label: schema.label ?? 'name',
    crud: schema.crud?.length ? schema.crud.split(',') : [],
    model,
    modelOwner: schema.modelOwnerId ? 'User' : undefined,
    modelOwnerId: schema.modelOwnerId ?? undefined,
    modelParent: schema.modelParent ?? undefined,
    modelParentId: schema.modelParentId ?? undefined,
    npmScope,
    skipDataAccess: schema.skipDataAccess ?? false,
    skipFeature: schema.skipFeature ?? false,
    skipUi: schema.skipUi ?? false,
  }
}
