import { Tree } from '@nx/devkit'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { getWebModuleInfo } from './get-web-module-info'

export async function generateWebLibDataAccess(tree: Tree, options: NormalizedWebFeatureSchema, npmScope: string) {
  const { project, barrel, className, fileName, propertyName } = getWebModuleInfo(
    tree,
    options.app,
    'data-access',
    options.name,
    options.model,
  )
}
