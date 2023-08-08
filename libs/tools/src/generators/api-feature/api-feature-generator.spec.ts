import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockApp } from '../../lib/utils/create-mock-app'

import { apiFeatureGenerator } from './api-feature-generator'
import { ApiFeatureGeneratorSchema } from './api-feature-schema'

describe('api-feature generator', () => {
  let tree: Tree
  const options: ApiFeatureGeneratorSchema = { app: 'api', name: 'test' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should generate the feature libraries', async () => {
    await createMockApp(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature']
    await apiFeatureGenerator(tree, options)

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${options.name}-${lib}`)
      expect(config).toBeDefined()
    })
  })

  it('should generate the feature libraries with util lib', async () => {
    await createMockApp(tree, options.app)

    // By default, we generate two libraries: data-access and feature
    const libs = ['data-access', 'feature', 'util']
    await apiFeatureGenerator(tree, { ...options, skipUtil: false })

    libs.forEach((lib) => {
      const config = readProjectConfiguration(tree, `${options.app}-${options.name}-${lib}`)
      expect(config).toBeDefined()
    })
  })

  it('should generate the feature libraries with custom names', async () => {
    await createMockApp(tree, options.app)

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
