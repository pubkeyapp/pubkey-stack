import { readProjectConfiguration, Tree } from '@nx/devkit'
import { ApiLibType } from '../types/api-feature'
import { getImportPath } from '../utils/get-import-path'

export function getApiLib(tree: Tree, app: string, name: string, type: ApiLibType) {
  const project = readProjectConfiguration(tree, `${app}-${name}-${type}`)
  const importPath = getImportPath(tree, `${project.sourceRoot}/index.ts`)

  return { importPath, project }
}
