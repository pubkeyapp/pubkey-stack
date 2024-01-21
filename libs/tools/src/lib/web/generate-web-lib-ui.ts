import { Tree } from '@nx/devkit'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { getWebModuleInfo } from './get-web-module-info'

export async function generateWebLibUi(tree: Tree, options: NormalizedWebFeatureSchema, npmScope: string) {
  const { project, barrel, className, fileName, propertyName, propertyNamePlural } = getWebModuleInfo(
    tree,
    options.app,
    'ui',
    options.name,
    options.model,
  )
}
