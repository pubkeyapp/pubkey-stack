import { Tree } from '@nx/devkit'
import { serviceGenerator } from '@nx/nest'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { addExport } from '../utils/add-export'
import { apiAddCrudServiceMethods } from './api-add-crud-service-methods'
import { apiUpdateDataAccessModule } from './api-update-data-access-module'
import { apiUpdateDataAccessService } from './api-update-data-access-service'
import { getApiDataAccessModuleInfo } from './get-api-data-access-module-info'

export async function generateApiLibDataAccess(tree: Tree, options: NormalizedApiFeatureSchema) {
  // We create the services for this data-access module
  await serviceGenerator(tree, {
    name: `${options.app}-${options.name}`,
    project: `${options.app}-${options.name}-data-access`,
    flat: true,
    directory: 'lib',
    unitTestRunner: 'none',
    skipFormat: true,
  })

  if (!options.skipAdminCrud) {
    await serviceGenerator(tree, {
      name: `${options.app}-${options.name}-admin`,
      project: `${options.app}-${options.name}-data-access`,
      flat: true,
      directory: 'lib',
      unitTestRunner: 'none',
      skipFormat: true,
    })
  }

  // We get the module info for the core and target modules
  const coreModule = getApiDataAccessModuleInfo(tree, options.app, 'core')
  const targetModule = getApiDataAccessModuleInfo(tree, options.app, options.name)

  apiUpdateDataAccessModule(tree, targetModule.modulePath, {
    exportClass: targetModule.serviceClassName,
    coreClass: coreModule.moduleClassName,
    corePackage: coreModule.importPath,
    targetClass: targetModule.moduleClassName,
  })

  apiUpdateDataAccessService(tree, targetModule.servicePath, {
    importClass: coreModule.serviceClassName,
    importPackage: coreModule.importPath,
    importProperty: 'core',
    targetClass: targetModule.serviceClassName,
    adminServiceFile: !options.skipAdminCrud ? targetModule.adminServiceFile : undefined,
    adminServiceClass: !options.skipAdminCrud ? targetModule.adminServiceClassName : undefined,
  })

  addExport(tree, `${targetModule.project.sourceRoot}/index.ts`, `./lib/${options.app}-${options.name}.service`)

  if (!options.skipAdminCrud) {
    addExport(tree, `${targetModule.project.sourceRoot}/index.ts`, `./lib/${options.app}-${options.name}-admin.service`)
    apiUpdateDataAccessService(tree, targetModule.adminServicePath, {
      importClass: coreModule.serviceClassName,
      importPackage: coreModule.importPath,
      importProperty: 'core',
      targetClass: targetModule.adminServiceClassName,
    })

    apiAddCrudServiceMethods(tree, targetModule.adminServicePath, {
      modelName: options.modelName,
      targetClass: targetModule.adminServiceClassName,
      label: options.label,
    })
  }
}
