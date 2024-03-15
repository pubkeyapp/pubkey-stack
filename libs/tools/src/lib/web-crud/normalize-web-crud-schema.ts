import { Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { WebCrudGeneratorSchema } from '../../generators/web-crud/web-crud-schema'
import { getPrismaModelFields } from '../prisma/get-prisma-models'
import { NormalizedWebCrudGeneratorSchema } from './normalized-web-crud-generator-schema'

export function normalizeWebCrudSchema(tree: Tree, schema: WebCrudGeneratorSchema): NormalizedWebCrudGeneratorSchema {
  const npmScope = getNpmScope(tree)
  const modelOwnerId = schema.modelOwnerId ?? undefined
  const modelOwnerProperty = modelOwnerId?.replace('Id', '')
  const modelParent = schema.modelParent ?? undefined
  const modelParentId = schema.modelParentId ?? undefined
  const modelParentProperty = modelParentId?.replace('Id', '')
  const fields = getPrismaModelFields(tree, schema.model) ?? [{ name: 'name', type: 'string', optional: false }]

  return {
    app: schema.app ?? 'web',
    actor: schema.actor,
    label: schema.label ?? 'name',
    model: schema.model,
    modelOwner: schema.modelOwnerId ? 'User' : undefined,
    modelOwnerId,
    modelOwnerProperty,
    modelParent,
    modelParentId,
    npmScope,
    fields: fields.filter(
      (f) => ![modelOwnerId, modelOwnerProperty, modelParentId, modelParentProperty].includes(f.name),
    ),
  }
}
