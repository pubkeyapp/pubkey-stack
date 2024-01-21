import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileNames } from '../../lib/utils/get-recursive-file-contents'
import { normalizeWebFeatureSchema } from '../../lib/web'
import { createMockWebApp } from '../../lib/web/create-mock-web-app'

import { webFeatureGenerator } from './web-feature-generator'
import { type NormalizedWebFeatureSchema, WebFeatureGeneratorSchema } from './web-feature-schema'

describe('web-feature generator', () => {
  let tree: Tree
  const rawOptions: WebFeatureGeneratorSchema = { app: 'web', name: 'test' }
  let options: NormalizedWebFeatureSchema

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()
    options = normalizeWebFeatureSchema(tree, rawOptions)
    await createMockWebApp(tree, options.app)
  })

  it('should run successfully', async () => {
    await webFeatureGenerator(tree, options)

    const basePathDataAccess = `libs/${options.app}/${options.name}/data-access/src`
    const basePathFeature = `libs/${options.app}/${options.name}/feature/src`
    const basePathUi = `libs/${options.app}/${options.name}/ui/src`

    const sourceFilesDataAccess = getRecursiveFileNames({ tree, path: basePathDataAccess })
    const sourceFilesFeature = getRecursiveFileNames({ tree, path: basePathFeature })
    const sourceFilesUi = getRecursiveFileNames({ tree, path: basePathUi })

    expect(sourceFilesDataAccess).toMatchInlineSnapshot(`
      [
        "libs/web/test/data-access/src/index.ts",
      ]
    `)
    expect(sourceFilesFeature).toMatchInlineSnapshot(`
      [
        "libs/web/test/feature/src/index.ts",
      ]
    `)
    expect(sourceFilesUi).toMatchInlineSnapshot(`
      [
        "libs/web/test/ui/src/index.ts",
      ]
    `)

    const files = [...sourceFilesDataAccess, ...sourceFilesFeature, ...sourceFilesUi]

    files.forEach((file) => {
      expect(tree.exists(file)).toBeTruthy()
      expect(tree.read(file).toString()).toMatchSnapshot()
    })
  })

  // it('should run successfully with crud', async () => {
  //   await webFeatureGenerator(tree, options)
  //
  //   const basePathDataAccess = `libs/${options.app}/${options.name}/data-access/src`
  //   const basePathFeature = `libs/${options.app}/${options.name}/feature/src`
  //   const basePathUi = `libs/${options.app}/${options.name}/ui/src`
  //
  //   const sourceFilesDataAccess = getRecursiveFileNames({ tree, path: basePathDataAccess })
  //   const sourceFilesFeature = getRecursiveFileNames({ tree, path: basePathFeature })
  //   const sourceFilesUi = getRecursiveFileNames({ tree, path: basePathUi })
  //
  //   expect(sourceFilesDataAccess).toMatchInlineSnapshot(`
  //     [
  //       "libs/web/test/data-access/src/index.ts",
  //     ]
  //   `)
  //   expect(sourceFilesFeature).toMatchInlineSnapshot(`
  //     [
  //       "libs/web/test/feature/src/index.ts",
  //     ]
  //   `)
  //   expect(sourceFilesUi).toMatchInlineSnapshot(`
  //     [
  //       "libs/web/test/ui/src/index.ts",
  //     ]
  //   `)
  //
  //   const files = [...sourceFilesDataAccess, ...sourceFilesFeature, ...sourceFilesUi]
  //
  //   files.forEach((file) => {
  //     expect(tree.exists(file)).toBeTruthy()
  //     expect(tree.read(file).toString()).toMatchSnapshot()
  //   })
  // })
})
