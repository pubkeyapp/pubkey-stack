import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockApi } from '../../lib/api/create-mock-api'

import { apiFeatureGenerator } from './api-feature-generator'
import { ApiFeatureGeneratorSchema } from './api-feature-schema'

describe('api-feature generator', () => {
  let tree: Tree
  const options: ApiFeatureGeneratorSchema = { app: 'api', name: 'test', label: 'name' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should generate the feature libraries', async () => {
    await createMockApi(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature']
    await apiFeatureGenerator(tree, options)

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${options.name}-${lib}`)
      expect(config).toBeDefined()
    })

    const basePathDataAccess = `libs/${options.app}/${options.name}/data-access/src`
    const dataAccessBarrel = `${basePathDataAccess}/index.ts`
    expect(tree.exists(dataAccessBarrel)).toBeTruthy()
    expect(tree.read(dataAccessBarrel).toString()).toMatchSnapshot()

    const dataAccessService = `${basePathDataAccess}/lib/${options.app}-${options.name}.service.ts`
    expect(tree.exists(dataAccessService)).toBeTruthy()
    expect(tree.read(dataAccessService).toString()).toMatchSnapshot()

    const dataAccessAdminService = `${basePathDataAccess}/lib/${options.app}-${options.name}-admin.service.ts`
    expect(tree.exists(dataAccessAdminService)).toBeTruthy()
    expect(tree.read(dataAccessAdminService).toString()).toMatchSnapshot()

    const basePathFeature = `libs/${options.app}/${options.name}/feature/src`
    const featureBarrel = `${basePathFeature}/index.ts`
    expect(tree.exists(featureBarrel)).toBeTruthy()
    expect(tree.read(featureBarrel).toString()).toMatchSnapshot()

    const dataAccessResolver = `${basePathFeature}/lib/${options.app}-${options.name}.resolver.ts`
    expect(tree.exists(dataAccessResolver)).toBeTruthy()
    expect(tree.read(dataAccessResolver).toString()).toMatchSnapshot()

    const dataAccessAdminResolver = `${basePathFeature}/lib/${options.app}-${options.name}-admin.resolver.ts`
    expect(tree.exists(dataAccessAdminResolver)).toBeTruthy()
    expect(tree.read(dataAccessAdminResolver).toString()).toMatchSnapshot()
  })

  it('should generate the feature libraries with util lib', async () => {
    await createMockApi(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature', 'util']
    await apiFeatureGenerator(tree, { ...options, skipUtil: false })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${options.name}-${lib}`)
      expect(config).toBeDefined()
    })
  })

  it('should generate the feature with different name', async () => {
    const testOptions = { ...options, name: 'company' }
    await createMockApi(tree, testOptions.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature', 'util']
    await apiFeatureGenerator(tree, { ...testOptions, skipUtil: false })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${testOptions.app}-${testOptions.name}-${lib}`)
      expect(config).toBeDefined()
    })
  })

  it('should generate the feature libraries with custom names', async () => {
    await createMockApi(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature']
    const customName = 'custom'
    await apiFeatureGenerator(tree, { ...options, name: customName })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${customName}-${lib}`)
      expect(config).toBeDefined()
    })
  })
})
