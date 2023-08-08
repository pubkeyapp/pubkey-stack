import { Tree } from '@nx/devkit'
import { libraryGenerator } from '@nx/nest'
import { ApiLibType } from '../types/api-feature'
import { generateApiLibDataAccess } from './generate-api-lib-data-access'
import { generateApiLibFeature } from './generate-api-lib-feature'

export async function generateApiLib(tree: Tree, app: string, name: string, type: ApiLibType) {
  const generated = await libraryGenerator(tree, {
    name: type,
    directory: `libs/${app}/${name}`,
    tags: `app:${app},type:${type}`,
    skipFormat: true,
  })
  if (!generated) {
    throw new Error(`Failed to generate ${type} library`)
  }

  switch (type) {
    case 'data-access':
      await generateApiLibDataAccess(tree, app, name)
      break
    case 'feature':
      await generateApiLibFeature(tree, app, name)
      break
  }

  return generated
}
