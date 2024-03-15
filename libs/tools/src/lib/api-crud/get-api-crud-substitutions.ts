import { names } from '@nx/devkit'
import * as pluralize from 'pluralize'

import { NormalizedApiCrudSchema } from './normalized-api-crud.schema'

export function getApiCrudSubstitutions(options: NormalizedApiCrudSchema) {
  const actor = names(options.actor)
  const app = names(options.app)
  const model = names(options.model)

  return {
    actor,
    actorFileName: actor.fileName,
    app,
    appFileName: app.fileName,
    fields: options.fields,
    label: names(options.label),
    model,
    modelFileName: model.fileName,
    modelPropertyNamePlural: names(pluralize.plural(options.model)).propertyName,
    owner: options.modelOwner ? names(options.modelOwner) : undefined,
    ownerId: options.modelOwnerId,
    ownerPropertyId: options.modelOwnerId?.replace('Id', ''),
    parent: options.modelParent ? names(options.modelParent) : undefined,
    parentId: options.modelParentId,
    parentPropertyId: options.modelParentId?.replace('Id', ''),
    npmScope: options.npmScope,
  }
}
