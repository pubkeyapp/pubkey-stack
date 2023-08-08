import { Tree } from '@nrwl/devkit'
import { generateApiLib } from './generate-api-lib'

export interface ApiFeatureSchema {
  app?: string
  name: string
  label?: string
  modelName?: string
  pluralModelName?: string
  skipAdminCrud?: boolean
  skipDataAccess?: boolean
  skipFeature?: boolean
  skipUtil?: boolean
}

export async function generateApiFeature(tree: Tree, options: ApiFeatureSchema) {
  const app = options.app ?? 'api'
  const name = options.name
  const label = options.label ?? 'name'

  if (!options.skipDataAccess) {
    await generateApiLib(tree, {
      app,
      name,
      label,
      type: 'data-access',
      adminCrud: !options.skipAdminCrud,
      modelName: options.modelName,
      pluralModelName: options.pluralModelName,
    })
  }
  if (!options.skipFeature) {
    await generateApiLib(tree, {
      app,
      name,
      label,
      type: 'feature',
      adminCrud: !options.skipAdminCrud,
      modelName: options.modelName,
      pluralModelName: options.pluralModelName,
    })
  }
  if (!options.skipUtil) {
    await generateApiLib(tree, { app, name, label, type: 'util' })
  }
}
