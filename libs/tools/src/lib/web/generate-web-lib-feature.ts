import { Tree } from '@nx/devkit'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { getWebModuleInfo } from './get-web-module-info'

export async function generateWebLibFeature(tree: Tree, options: NormalizedWebFeatureSchema, npmScope: string) {
  const { project, barrel, className, classNamePlural, fileName, fileNamePlural, propertyName, propertyNamePlural } =
    getWebModuleInfo(tree, options.app, 'feature', options.name, options.model)

  if (!options.skipAdminCrud) {
  }
}
