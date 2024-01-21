import { Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import type { NormalizedWebCrudSchema, WebCrudGeneratorSchema } from '../../generators/web-crud/web-crud-schema'

export function normalizeWebCrudSchema(tree: Tree, schema: WebCrudGeneratorSchema): NormalizedWebCrudSchema {
  const npmScope = getNpmScope(tree)
  return {
    app: schema.app ?? 'web',
    actor: schema.actor,
    label: schema.label ?? 'name',
    model: schema.model,
    npmScope,
  }
}
