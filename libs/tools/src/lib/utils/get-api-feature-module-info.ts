import { names, Tree } from '@nx/devkit'
import { getLib } from './get-lib'

export function getApiFeatureModuleInfo(tree: Tree, app: string, name: string) {
  const lib = getLib(tree, app, name, 'feature')
  const modulePath = `${lib.project.sourceRoot}/lib/${lib.project.name}.module.ts`

  if (!tree.exists(modulePath)) {
    throw new Error(`getApiFeatureModuleInfo: ${modulePath} does not exist in ${lib.project.sourceRoot}`)
  }

  const { className: moduleClassName } = names(`${lib.project.name}-module`)

  const resolverPath = `${lib.project.sourceRoot}/lib/${app}-${name}.resolver.ts`

  if (!tree.exists(resolverPath)) {
    throw new Error(`getApiFeatureModuleInfo: ${resolverPath} does not exist in ${lib.project.sourceRoot}`)
  }

  const { className: resolverName } = names(`${app}-${name}-resolver`)

  return { ...lib, modulePath, moduleClassName, resolverPath, resolverName }
}
