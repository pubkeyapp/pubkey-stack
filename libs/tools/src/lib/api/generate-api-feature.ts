import { Tree } from '@nx/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { generateApiCrud } from '../api-crud/generate-api-crud'
import { generateApiLib } from './generate-api-lib'
import { generateSdkFile } from './generate-sdk-file'

export async function generateApiFeature(tree: Tree, options: NormalizedApiFeatureSchema) {
  // FIXME: Make sure we can run this feature twice. If the libraries already exist we should skip them
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
    await generateSdkFile(tree, options)
  }
  if (!options.skipDataAccess && !options.skipFeature && options.crud?.length) {
    for (const actor of options.crud) {
      generateApiCrud(tree, {
        actor,
        app: options.app,
        label: options.label,
        model: options.model,
        npmScope: options.npmScope,
      })
    }
  }
}
