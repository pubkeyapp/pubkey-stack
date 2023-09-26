import { readJson, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'

import { renameGenerator } from './rename-generator'
import { RenameGeneratorSchema } from './rename-schema'

describe('rename generator', () => {
  let tree: Tree
  const options: RenameGeneratorSchema = { search: 'proj', replace: 'new-name', dryRun: false, quiet: true }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should add tests ', async () => {
    await renameGenerator(tree, options)
    const nxJson = readJson(tree, 'nx.json')
    expect(nxJson.npmScope).toEqual(options.replace)
  })
})
