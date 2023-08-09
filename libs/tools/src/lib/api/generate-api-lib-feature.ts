import { Tree } from '@nx/devkit'
import { resolverGenerator } from '@nx/nest'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { apiAddCrudResolverMethods } from './api-add-crud-resolver-methods'
import { apiUpdateCoreFeatureModule } from './api-update-core-feature-module'
import { apiUpdateFeatureModule } from './api-update-feature-module'
import { apiUpdateFeatureResolver } from './api-update-feature-resolver'
import { getApiCoreFeatureInfo } from './get-api-core-feature-info'
import { getApiDataAccessModuleInfo } from './get-api-data-access-module-info'

import { getApiFeatureModuleInfo } from './get-api-feature-module-info'

export async function generateApiLibFeature(tree: Tree, options: NormalizedApiFeatureSchema) {
  // We create the resolver for the feature
  await resolverGenerator(tree, {
    name: `${options.app}-${options.name}`,
    project: `${options.app}-${options.name}-feature`,
    flat: true,
    directory: 'lib',
  })

  if (!options.skipAdminCrud) {
    await resolverGenerator(tree, {
      name: `${options.app}-${options.name}-admin`,
      project: `${options.app}-${options.name}-feature`,
      flat: true,
      directory: 'lib',
    })
  }

  // We get the module info for the data access and target modules
  const dataAccessModule = getApiDataAccessModuleInfo(tree, options.app, options.name)
  const targetModule = getApiFeatureModuleInfo(tree, options.app, options.name)

  apiUpdateFeatureModule(tree, targetModule.modulePath, {
    dataAccessClass: dataAccessModule.moduleClassName,
    dataAccessPackage: dataAccessModule.importPath,
    targetClass: targetModule.moduleClassName,
  })

  apiUpdateFeatureResolver(tree, targetModule.resolverPath, {
    dataAccessClass: dataAccessModule.serviceClassName,
    dataAccessPackage: dataAccessModule.importPath,
    importProperty: 'service',
    targetClass: targetModule.resolverName,
  })

  if (!options.skipAdminCrud) {
    apiUpdateFeatureResolver(tree, targetModule.adminResolverPath, {
      dataAccessClass: dataAccessModule.serviceClassName,
      dataAccessPackage: dataAccessModule.importPath,
      importProperty: 'service',
      targetClass: targetModule.adminResolverClassName,
    })

    apiAddCrudResolverMethods(tree, targetModule.adminResolverPath, {
      authDataAccessImportPath: dataAccessModule.importPath.replace(options.name, 'auth'),
      dataAccessImportPath: dataAccessModule.importPath,
      modelName: options.modelName,
      pluralModelName: options.pluralModelName,
      targetClass: targetModule.adminResolverClassName,
    })
  }

  // Register the feature module in the core module
  const coreFeatureModule = getApiCoreFeatureInfo(tree, 'api')
  apiUpdateCoreFeatureModule(tree, coreFeatureModule.modulePath, {
    featureClass: targetModule.moduleClassName,
    featurePackage: targetModule.importPath,
  })
}
