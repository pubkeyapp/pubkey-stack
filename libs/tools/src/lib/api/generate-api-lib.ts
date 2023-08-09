import { Tree } from '@nx/devkit'
import { libraryGenerator } from '@nx/nest'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'
import { ApiLibType } from '../types/api-feature'
import { generateApiLibDataAccess } from './generate-api-lib-data-access'
import { generateApiLibFeature } from './generate-api-lib-feature'

export async function generateApiLib(tree: Tree, type: ApiLibType, options: NormalizedApiFeatureSchema) {
  const generated = await libraryGenerator(tree, {
    name: type,
    directory: `libs/${options.app}/${options.name}`,
    tags: `app:${options.app},type:${type}`,
    skipFormat: true,
  })
  if (!generated) {
    throw new Error(`Failed to generate ${type} library`)
  }

  switch (type) {
    case 'data-access':
      await generateApiLibDataAccess(tree, options)
      break
    case 'feature':
      await generateApiLibFeature(tree, options)
      break
  }

  return generated
}
