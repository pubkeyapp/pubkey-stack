import { names, Tree } from '@nx/devkit'
import { getApiLib } from './get-api-lib'

export function getApiDataAccessModuleInfo(tree: Tree, app: string, name: string) {
  const lib = getApiLib(tree, app, name, 'data-access')
  const modulePath = `${lib.project.sourceRoot}/lib/${lib.project.name}.module.ts`

  if (!tree.exists(modulePath)) {
    throw new Error(`getApiDataAccessModuleInfo: ${modulePath} does not exist in ${lib.project.sourceRoot}`)
  }

  const { className: moduleClassName } = names(`${lib.project.name}-module`)

  const servicePath = `${lib.project.sourceRoot}/lib/${app}-${name}.service.ts`

  if (!tree.exists(servicePath)) {
    throw new Error(`getApiDataAccessModuleInfo: ${servicePath} does not exist in ${lib.project.sourceRoot}`)
  }

  const { className: serviceClassName } = names(`${app}-${name}-service`)

  // Optional admin service name and path
  const adminServiceFile = `${app}-${name}-admin.service.ts`
  const adminServicePath = `${lib.project.sourceRoot}/lib/${adminServiceFile}`
  let adminServiceClassName: string | undefined

  if (tree.exists(adminServicePath)) {
    adminServiceClassName = names(adminServiceFile.replace('.ts', '')).className
  }

  return {
    ...lib,
    modulePath,
    moduleClassName,
    servicePath,
    serviceClassName,
    adminServicePath,
    adminServiceFile,
    adminServiceClassName,
  }
}
