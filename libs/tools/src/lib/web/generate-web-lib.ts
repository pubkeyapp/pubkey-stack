import { Tree } from '@nx/devkit'
import { Linter } from '@nx/linter'
import { libraryGenerator } from '@nx/react'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { WebLibType } from '../types/web-feature'
import { generateWebLibDataAccess } from './generate-web-lib-data-access'
import { generateWebLibFeature } from './generate-web-lib-feature'
import { generateWebLibUi } from './generate-web-lib-ui'

export async function generateWebLib(tree: Tree, type: WebLibType, options: NormalizedWebFeatureSchema) {
  const generated = await libraryGenerator(tree, {
    linter: Linter.EsLint,
    style: 'css',
    name: type,
    directory: `libs/${options.app}/${options.name}`,
    tags: `app:${options.app},type:${type}`,
    skipFormat: true,
  })
  if (!generated) {
    throw new Error(`Failed to generate ${type} library`)
  }
  const npmScope = tree.read('nx.json', 'utf-8')?.match(/"npmScope": "(.*)"/)?.[1]

  if (!npmScope) {
    throw new Error('Could not find npmScope in nx.json')
  }

  switch (type) {
    case 'data-access':
      await generateWebLibDataAccess(tree, options, npmScope)
      break
    case 'feature':
      await generateWebLibFeature(tree, options, npmScope)
      break
    case 'ui':
      await generateWebLibUi(tree, options, npmScope)
      break
  }

  return generated
}
