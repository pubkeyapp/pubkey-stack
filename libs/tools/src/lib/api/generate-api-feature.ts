import { Tree } from '@nrwl/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { generateApiLib } from './generate-api-lib'

export async function generateApiFeature(tree: Tree, options: NormalizedApiFeatureSchema) {
  if (!options.skipDataAccess) {
    await generateApiLib(tree, 'data-access', options)
  }
  if (!options.skipFeature) {
    await generateApiLib(tree, 'feature', options)
  }
  if (!options.skipUtil) {
    await generateApiLib(tree, 'util', options)
  }
  if (!options.skipSdk) {
    // throw new Error('generateApiFeature: skipSdk is not implemented')
  }
}
