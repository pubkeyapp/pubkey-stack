import { names } from '@nx/devkit'
import type { NormalizedApiCrudSchema } from '../../generators/api-crud/api-crud-schema'

export function getApiCrudSubstitutions(options: NormalizedApiCrudSchema) {
  const actor = names(options.actor)
  const app = names(options.app)
  const model = names(options.model)

  return {
    actor,
    actorFileName: actor.fileName,
    app,
    appFileName: app.fileName,
    label: names(options.label),
    model,
    modelFileName: model.fileName,
    npmScope: options.npmScope,
  }
}
