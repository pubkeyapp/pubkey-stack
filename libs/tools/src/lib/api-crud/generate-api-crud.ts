import { generateFiles, type ProjectConfiguration, Tree } from '@nx/devkit'
import type { NormalizedApiCrudSchema } from '../../generators/api-crud/api-crud-schema'
import { addExports } from '../utils/add-export'
import { ensureNxProjectExists } from '../utils/ensure-nx-project-exists'
import { addServiceToClassConstructor } from './add-service-to-class-constructor'
import { addServiceToModuleDecorator } from './add-service-to-module-decorator'
import { getApiCrudSubstitutions } from './get-api-crud-substitutions'

export function generateApiCrud(tree: Tree, options: NormalizedApiCrudSchema) {
  const projects: ProjectConfiguration[] = [
    `${options.app}-${options.model}-data-access`,
    `${options.app}-${options.model}-feature`,
  ].map((project) => ensureNxProjectExists(tree, project))
  const [dataAccess, feature] = projects
  const substitutions = getApiCrudSubstitutions(options)

  const serviceName = `${substitutions.app.className}${substitutions.actor.className}${substitutions.model.className}Service`
  const serviceFileName = `${substitutions.appFileName}-${substitutions.actorFileName}-${substitutions.modelFileName}.service.ts`
  const resolverName = `${substitutions.app.className}${substitutions.actor.className}${substitutions.model.className}Resolver`
  const resolverFileName = `${substitutions.appFileName}-${substitutions.actorFileName}-${substitutions.modelFileName}.resolver.ts`

  const requiredFields = [
    `${dataAccess.sourceRoot}/lib/${substitutions.appFileName}-${substitutions.modelFileName}.service.ts`,
    `${dataAccess.sourceRoot}/lib/${substitutions.appFileName}-${substitutions.modelFileName}-data-access.module.ts`,
    `${feature.sourceRoot}/lib/${substitutions.appFileName}-${substitutions.modelFileName}-feature.module.ts`,
    `${dataAccess.sourceRoot}/lib/entity/${substitutions.modelFileName}.entity.ts`,
  ]

  for (const field of requiredFields) {
    if (!tree.exists(field)) {
      throw new Error(`Required file not found: ${field}`)
    }
  }

  const [dataAccessServicePath, dataAccessModulePath, featureModulePath] = requiredFields

  const dataAccessExports: string[] = [
    // Add exports here
    `./lib/dto/${substitutions.actorFileName}-create-${substitutions.modelFileName}.input`,
    `./lib/dto/${substitutions.actorFileName}-find-many-${substitutions.modelFileName}.input`,
    `./lib/dto/${substitutions.actorFileName}-update-${substitutions.modelFileName}.input`,
    `./lib/entity/${substitutions.modelFileName}-paging.entity`,
  ]

  // Generate the data access library
  generateFiles(tree, `${__dirname}/files/data-access`, dataAccess.sourceRoot, { ...substitutions })

  // Add the crud service to the service constructor
  addServiceToClassConstructor(
    tree,
    dataAccessServicePath,
    `${substitutions.app.className}${substitutions.model.className}Service`,
    substitutions.actor.propertyName,
    serviceName,
    serviceFileName,
  )
  // Add the crud service to the module providers
  addServiceToModuleDecorator(tree, dataAccessModulePath, serviceName, serviceFileName, 'providers')
  // Add the crud service to the module resolvers
  addServiceToModuleDecorator(tree, featureModulePath, resolverName, resolverFileName, 'resolvers')

  // Add the exports to the barrel file
  addExports(tree, `${dataAccess.sourceRoot}/index.ts`, dataAccessExports)

  // Generate the data access library
  generateFiles(tree, `${__dirname}/files/feature`, feature.sourceRoot, { ...substitutions })
}
