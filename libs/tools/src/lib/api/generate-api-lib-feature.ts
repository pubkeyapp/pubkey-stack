import { generateFiles, Tree } from '@nx/devkit'

import { replaceExports } from '../utils/ast/add-export'
import { apiUpdateCoreFeatureModule } from './api-update-core-feature-module'
import { getApiCoreFeatureInfo } from './get-api-core-feature-info'
import { getApiFeatureModuleInfo } from './get-api-feature-module-info'
import { getApiSubstitutions } from './get-api-substitutions'
import { NormalizedApiFeatureSchema } from './normalized-api-feature-schema'

export async function generateApiLibFeature(tree: Tree, options: NormalizedApiFeatureSchema) {
  const substitutions = getApiSubstitutions(options)

  const { featureModulePath, featureProjectRoot, featureModuleClassName, featureImportPath } = getApiFeatureModuleInfo(
    tree,
    options,
  )

  // Remove the generated feature module
  tree.delete(featureModulePath)

  // Generate the feature library
  generateFiles(tree, `${__dirname}/files/feature`, featureProjectRoot, { ...substitutions })

  // Register the feature module in the core module
  const { coreFeatureModulePath } = getApiCoreFeatureInfo(tree, options.app)
  apiUpdateCoreFeatureModule(tree, coreFeatureModulePath, {
    featureClass: featureModuleClassName,
    featurePackage: featureImportPath,
  })

  replaceExports(tree, `${featureProjectRoot}/index.ts`, [`./lib/${options.app}-${options.model}.feature.module`])
}
