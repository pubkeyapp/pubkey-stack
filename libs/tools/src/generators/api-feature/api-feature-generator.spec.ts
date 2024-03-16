import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockApiApp } from '../../lib/api/create-mock-api-app'

import { getRecursiveFileNames } from '../../lib/utils/get-recursive-file-names'

import { apiFeatureGenerator } from './api-feature-generator'
import { ApiFeatureGeneratorSchema } from './api-feature-schema'

describe('api-feature generator', () => {
  let tree: Tree
  const options: ApiFeatureGeneratorSchema = { app: 'api', label: 'name', model: 'test' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should generate the minimal feature libraries', async () => {
    await createMockApiApp(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature']
    await apiFeatureGenerator(tree, options)

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${options.model}-${lib}`)
      expect(config).toBeDefined()
    })

    const basePathDataAccess = `libs/${options.app}/${options.model}/data-access/src`
    const basePathFeature = `libs/${options.app}/${options.model}/feature/src`

    const sourceFilesDataAccess = getRecursiveFileNames({ tree, path: basePathDataAccess })
    const sourceFilesFeature = getRecursiveFileNames({ tree, path: basePathFeature })

    expect(sourceFilesDataAccess).toMatchInlineSnapshot(`
      [
        "libs/api/test/data-access/src/index.ts",
        "libs/api/test/data-access/src/lib/api-test.data-access.module.ts",
        "libs/api/test/data-access/src/lib/api-test.service.ts",
      ]
    `)
    expect(sourceFilesFeature).toMatchInlineSnapshot(`
      [
        "libs/api/test/feature/src/index.ts",
        "libs/api/test/feature/src/lib/api-test.feature.module.ts",
        "libs/api/test/feature/src/lib/api-test.resolver.ts",
      ]
    `)

    const files = [...sourceFilesDataAccess, ...sourceFilesFeature]

    files.forEach((file) => {
      expect(tree.exists(file)).toBeTruthy()
      expect(tree.read(file).toString()).toMatchSnapshot()
    })
  })

  it('should generate the feature libraries with crud for admin and user ', async () => {
    await createMockApiApp(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature']
    await apiFeatureGenerator(tree, { ...options, crud: 'admin,user' })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${options.model}-${lib}`)
      expect(config).toBeDefined()
    })

    const basePathDataAccess = `libs/${options.app}/${options.model}/data-access/src`
    const basePathFeature = `libs/${options.app}/${options.model}/feature/src`

    const sourceFilesDataAccess = getRecursiveFileNames({ tree, path: basePathDataAccess })
    const sourceFilesFeature = getRecursiveFileNames({ tree, path: basePathFeature })

    expect(sourceFilesDataAccess).toMatchInlineSnapshot(`
      [
        "libs/api/test/data-access/src/index.ts",
        "libs/api/test/data-access/src/lib/api-test-data-admin.service.ts",
        "libs/api/test/data-access/src/lib/api-test-data-user.service.ts",
        "libs/api/test/data-access/src/lib/api-test-data.service.ts",
        "libs/api/test/data-access/src/lib/api-test.data-access.module.ts",
        "libs/api/test/data-access/src/lib/api-test.service.ts",
        "libs/api/test/data-access/src/lib/dto/test-admin-create.input.ts",
        "libs/api/test/data-access/src/lib/dto/test-admin-find-many.input.ts",
        "libs/api/test/data-access/src/lib/dto/test-admin-update.input.ts",
        "libs/api/test/data-access/src/lib/dto/test-user-create.input.ts",
        "libs/api/test/data-access/src/lib/dto/test-user-find-many.input.ts",
        "libs/api/test/data-access/src/lib/dto/test-user-update.input.ts",
        "libs/api/test/data-access/src/lib/entity/test.entity.ts",
        "libs/api/test/data-access/src/lib/helpers/get-test-where-admin.input.ts",
        "libs/api/test/data-access/src/lib/helpers/get-test-where-user.input.ts",
      ]
    `)
    expect(sourceFilesFeature).toMatchInlineSnapshot(`
      [
        "libs/api/test/feature/src/index.ts",
        "libs/api/test/feature/src/lib/api-test-admin.resolver.ts",
        "libs/api/test/feature/src/lib/api-test-user.resolver.ts",
        "libs/api/test/feature/src/lib/api-test.feature.module.ts",
        "libs/api/test/feature/src/lib/api-test.resolver.ts",
      ]
    `)

    const files = [...sourceFilesDataAccess, ...sourceFilesFeature]

    files.forEach((file) => {
      expect(tree.exists(file)).toBeTruthy()
      expect(tree.read(file).toString()).toMatchSnapshot()
    })
  })
  it('should generate the feature libraries with util lib', async () => {
    await createMockApiApp(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature', 'util']
    await apiFeatureGenerator(tree, { ...options, skipUtil: false })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${options.model}-${lib}`)
      expect(config).toBeDefined()
    })
  })

  it('should generate the feature with different name', async () => {
    const testOptions = { ...options, model: 'company' }
    await createMockApiApp(tree, testOptions.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature', 'util']
    await apiFeatureGenerator(tree, { ...testOptions, skipUtil: false })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${testOptions.app}-${testOptions.model}-${lib}`)
      expect(config).toBeDefined()
    })
  })

  it('should generate the feature libraries with custom names', async () => {
    await createMockApiApp(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature']
    const customName = 'custom'
    await apiFeatureGenerator(tree, { ...options, model: customName })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${customName}-${lib}`)
      expect(config).toBeDefined()
    })
  })
})
