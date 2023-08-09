import { names, Tree } from '@nx/devkit'
import { getApiLib } from './get-api-lib'

export function getApiCoreFeatureInfo(tree: Tree, app: string) {
  const lib = getApiLib(tree, app, 'core', 'feature')
  const modulePath = `${lib.project.sourceRoot}/lib/${lib.project.name}.module.ts`

  if (!tree.exists(modulePath)) {
    throw new Error(`getApiFeatureModuleInfo: ${modulePath} does not exist in ${lib.project.sourceRoot}`)
  }

  const { className: moduleClassName } = names(`${lib.project.name}-module`)

  return { ...lib, modulePath, moduleClassName }
}