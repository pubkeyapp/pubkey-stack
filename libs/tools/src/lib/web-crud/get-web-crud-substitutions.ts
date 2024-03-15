import { names } from '@nx/devkit'
import * as pluralize from 'pluralize'

import { NormalizedApiCrudSchema } from '../api-crud/normalized-api-crud.schema'

export function getWebCrudSubstitutions(options: NormalizedApiCrudSchema) {
  const actor = names(options.actor)
  const app = names(options.app)
  const model = names(options.model)
  const plural = names(pluralize.plural(options.model))

  return {
    actor,
    actorAdmin: actor.className === 'Admin',
    actorFileName: actor.fileName,
    app,
    appFileName: app.fileName,
    fields: options.fields,
    label: names(options.label),
    model,
    modelFileName: model.fileName,
    modelPropertyNamePlural: plural.propertyName,
    owner: options.modelOwner ? names(options.modelOwner) : undefined,
    ownerId: options.modelOwnerId,
    ownerPropertyId: options.modelOwnerId?.replace('Id', ''),
    parent: options.modelParent ? names(options.modelParent) : undefined,
    parentId: options.modelParentId,
    parentPropertyId: options.modelParentId?.replace('Id', ''),
    npmScope: options.npmScope,
    plural,
  }
}
