import { Tree } from '@nx/devkit'
import { serviceGenerator } from '@nx/nest'
import { addExport } from '../utils/add-export'
import { apiAddCrudServiceMethods } from '../utils/api-add-crud-service-methods'
import { apiUpdateDataAccessModule } from '../utils/api-update-data-access-module'
import { apiUpdateDataAccessService } from '../utils/api-update-data-access-service'
import { getApiDataAccessModuleInfo } from '../utils/get-api-data-access-module-info'
import { GenerateApiLibOptions } from './generate-api-lib'

export async function generateApiLibDataAccess(
  tree: Tree,
  { app, name, label, adminCrud, pluralModelName, modelName }: Omit<GenerateApiLibOptions, 'type'>,
) {
  // We create the services for this data-access module
  await serviceGenerator(tree, {
    name: `${app}-${name}`,
    project: `${app}-${name}-data-access`,
    flat: true,
    directory: 'lib',
  })

  if (adminCrud) {
    await serviceGenerator(tree, {
      name: `${app}-${name}-admin`,
      project: `${app}-${name}-data-access`,
      flat: true,
      directory: 'lib',
    })
  }

  // We get the module info for the core and target modules
  const coreModule = getApiDataAccessModuleInfo(tree, app, 'core')
  const targetModule = getApiDataAccessModuleInfo(tree, app, name)

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
    adminServiceFile: adminCrud ? targetModule.adminServiceFile : undefined,
    adminServiceClass: adminCrud ? targetModule.adminServiceClassName : undefined,
  })

  addExport(tree, `${targetModule.project.sourceRoot}/index.ts`, `./lib/${app}-${name}.service`)

  if (adminCrud) {
    addExport(tree, `${targetModule.project.sourceRoot}/index.ts`, `./lib/${app}-${name}-admin.service`)
    apiUpdateDataAccessService(tree, targetModule.adminServicePath, {
      importClass: coreModule.serviceClassName,
      importPackage: coreModule.importPath,
      importProperty: 'core',
      targetClass: targetModule.adminServiceClassName,
    })

    apiAddCrudServiceMethods(tree, targetModule.adminServicePath, {
      modelName: modelName ?? '',
      pluralModelName: pluralModelName ?? '',
      targetClass: targetModule.adminServiceClassName,
      label,
    })
  }
}
