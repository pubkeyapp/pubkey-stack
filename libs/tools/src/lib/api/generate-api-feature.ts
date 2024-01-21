import { getProjects, Tree } from '@nx/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { generateApiCrud } from '../api-crud/generate-api-crud'
import { generateApiLib } from './generate-api-lib'

export async function generateApiFeature(tree: Tree, options: NormalizedApiFeatureSchema) {
  const projects = getProjects(tree)
  const [dataAccess, feature, util] = [
    `${options.app}-${options.model}-data-access`,
    `${options.app}-${options.model}-feature`,
    `${options.app}-${options.model}-util`,
  ].map((name) => projects.get(name))

  if (!options.skipDataAccess && !dataAccess) {
    await generateApiLib(tree, 'data-access', options)
  }
  if (!options.skipFeature && !feature) {
    await generateApiLib(tree, 'feature', options)
  }
  if (!options.skipUtil && !util) {
    await generateApiLib(tree, 'util', options)
  }
  if (!options.skipDataAccess && !options.skipFeature && options.crud?.length) {
    for (const actor of options.crud) {
      generateApiCrud(tree, { actor, ...options })
    }
  }
}
