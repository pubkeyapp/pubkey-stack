import { names, Tree } from '@nx/devkit'
import { getLib } from './get-lib'

export function getApiDataAccessModuleInfo(tree: Tree, app: string, name: string) {
  const lib = getLib(tree, app, name, 'data-access')
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

  return { ...lib, modulePath, moduleClassName, servicePath, serviceClassName }
}
