import { names } from '@nx/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'

export function getApiSubstitutions(options: NormalizedApiFeatureSchema) {
  const admin = names('admin')
  const model = names(options.modelName)
  const user = names('user')

  return {
    admin,
    adminCrud: !options.skipAdminCrud,
    adminFileName: admin.fileName,
    modelFileName: model.fileName,
    app: names(options.app),
    label: names(options.label),
    model,
    npmScope: options.npmScope,
    user,
    // FIXME: Support user crud
    userCrud: false,
  }
}
