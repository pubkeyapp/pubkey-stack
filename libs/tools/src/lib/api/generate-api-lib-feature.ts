import { Tree } from '@nx/devkit'
import { resolverGenerator } from '@nx/nest'
import { apiAddCrudResolverMethods } from '../utils/api-add-crud-resolver-methods'
import { apiUpdateCoreFeatureModule } from '../utils/api-update-core-feature-module'
import { apiUpdateFeatureModule } from '../utils/api-update-feature-module'
import { apiUpdateFeatureResolver } from '../utils/api-update-feature-resolver'
import { getApiCoreFeatureInfo } from '../utils/get-api-core-feature-info'
import { getApiDataAccessModuleInfo } from '../utils/get-api-data-access-module-info'

import { getApiFeatureModuleInfo } from '../utils/get-api-feature-module-info'
import { GenerateApiLibOptions } from './generate-api-lib'

export async function generateApiLibFeature(
  tree: Tree,
  { app, name, modelName, pluralModelName, adminCrud }: Omit<GenerateApiLibOptions, 'type'>,
) {
  // We create the resolver for the feature
  await resolverGenerator(tree, {
    name: `${app}-${name}`,
    project: `${app}-${name}-feature`,
    flat: true,
    directory: 'lib',
  })

  if (adminCrud) {
    await resolverGenerator(tree, {
      name: `${app}-${name}-admin`,
      project: `${app}-${name}-feature`,
      flat: true,
      directory: 'lib',
    })
  }

  // We get the module info for the data access and target modules
  const dataAccessModule = getApiDataAccessModuleInfo(tree, app, name)
  const targetModule = getApiFeatureModuleInfo(tree, app, name)

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

  if (adminCrud) {
    apiUpdateFeatureResolver(tree, targetModule.adminResolverPath, {
      dataAccessClass: dataAccessModule.serviceClassName,
      dataAccessPackage: dataAccessModule.importPath,
      importProperty: 'service',
      targetClass: targetModule.adminResolverClassName,
    })

    apiAddCrudResolverMethods(tree, targetModule.adminResolverPath, {
      authDataAccessImportPath: dataAccessModule.importPath.replace(name, 'auth'),
      dataAccessImportPath: dataAccessModule.importPath,
      modelName: modelName ?? '',
      pluralModelName: pluralModelName ?? '',
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
