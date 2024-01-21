import { Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import type { ApiCrudGeneratorSchema, NormalizedApiCrudSchema } from '../../generators/api-crud/api-crud-schema'

export function normalizeApiCrudSchema(tree: Tree, schema: ApiCrudGeneratorSchema): NormalizedApiCrudSchema {
  const npmScope = getNpmScope(tree)
  return {
    app: schema.app ?? 'api',
    actor: schema.actor,
    label: schema.label ?? 'name',
    model: schema.model,
    npmScope,
  }
}
