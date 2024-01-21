import { readProjectConfiguration, Tree } from '@nx/devkit'

export function getApiDataAccessModuleInfo(tree: Tree, options: { app: string; model: string }) {
  const project = readProjectConfiguration(tree, `${options.app}-${options.model}-data-access`)

  const dataAccessProjectRoot = project.sourceRoot
  const dataAccessModulePath = `${dataAccessProjectRoot}/lib/${project.name}.module.ts`

  return {
    dataAccessProjectRoot,
    dataAccessModulePath,
  }
}
