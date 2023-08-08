import { Tree } from '@nrwl/devkit'
import { generateApiLib } from './generate-api-lib'

export interface ApiFeatureSchema {
  app?: string
  name: string
  skipDataAccess?: boolean
  skipFeature?: boolean
  skipUtil?: boolean
}

export async function generateApiFeature(tree: Tree, options: ApiFeatureSchema) {
  const app = options.app ?? 'api'
  const name = options.name

  if (!options.skipDataAccess) {
    await generateApiLib(tree, app, name, 'data-access')
  }
  if (!options.skipFeature) {
    await generateApiLib(tree, app, name, 'feature')
  }
  if (!options.skipUtil) {
    await generateApiLib(tree, app, name, 'util')
  }
}
