import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '../../lib/utils/get-recursive-file-contents'
import { normalizeWebFeatureSchema } from '../../lib/web'
import { createMockWebApp } from '../../lib/web/create-mock-web-app'

import { webFeatureGenerator } from './web-feature-generator'
import { type NormalizedWebFeatureSchema, WebFeatureGeneratorSchema } from './web-feature-schema'

describe('web-feature generator', () => {
  let tree: Tree
  const rawOptions: WebFeatureGeneratorSchema = { app: 'web', name: 'test' }
  let options: NormalizedWebFeatureSchema

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
    options = normalizeWebFeatureSchema(tree, rawOptions)
  })

  it('should run successfully', async () => {
    await createMockWebApp(tree, options.app)
    await webFeatureGenerator(tree, options)

    const contents = getRecursiveFileContents({
      tree,
      path: '.',
      exclude: ['./package.json'],
    })
    expect(contents).toMatchSnapshot()
  })
})
