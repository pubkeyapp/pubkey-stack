import { Tree } from '@nx/devkit'
import { resolverGenerator } from '@nx/nest'
import { apiUpdateCoreFeatureModule } from '../utils/api-update-core-feature-module'
import { apiUpdateFeatureModule } from '../utils/api-update-feature-module'
import { apiUpdateFeatureResolver } from '../utils/api-update-feature-resolver'
import { getApiCoreFeatureInfo } from '../utils/get-api-core-feature-info'
import { getApiDataAccessModuleInfo } from '../utils/get-api-data-access-module-info'

import { getApiFeatureModuleInfo } from '../utils/get-api-feature-module-info'

export async function generateApiLibFeature(tree: Tree, app: string, name: string) {
  // We create the resolver for the feature
  await resolverGenerator(tree, {
    name: `${app}-${name}`,
    project: `${app}-${name}-feature`,
    flat: true,
    directory: 'lib',
  })

  // We get the module info for the data access and target modules
  const dataAccessModule = getApiDataAccessModuleInfo(tree, app, name)
  const targetModule = getApiFeatureModuleInfo(tree, app, name)

  // console.log(tree.children(`${dataAccessModule.project.sourceRoot}/lib`))
  // console.log(tree.children(`${targetModule.project.sourceRoot}/lib`))

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

  const coreFeatureModule = getApiCoreFeatureInfo(tree, 'api')
  apiUpdateCoreFeatureModule(tree, coreFeatureModule.modulePath, {
    featureClass: targetModule.moduleClassName,
    featurePackage: targetModule.importPath,
  })
}
