import { formatFiles, Tree } from '@nx/devkit'
import { generateApiFeature } from '../../lib/api/generate-api-feature'
import { normalizeApiFeatureSchema } from '../../lib/api/normalize-api-feature-schema'
import { ensureAppExists } from '../../lib/utils/ensure-app-exists'
import { ApiFeatureGeneratorSchema } from './api-feature-schema'

export async function apiFeatureGenerator(tree: Tree, rawOptions: ApiFeatureGeneratorSchema) {
  const options = normalizeApiFeatureSchema(rawOptions)
  ensureAppExists(tree, options.app)
  await generateApiFeature(tree, options)
  await formatFiles(tree)
}

export default apiFeatureGenerator
