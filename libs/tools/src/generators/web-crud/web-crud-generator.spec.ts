import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { createMockApiApp } from '../../lib/api/create-mock-api-app'
import { getRecursiveFileContents } from '../../lib/utils/get-recursive-file-contents'
import { createMockWebApp } from '../../lib/web'
import { apiFeatureGenerator } from '../api-feature/api-feature-generator'
import { webFeatureGenerator } from '../web-feature/web-feature-generator'
import { webCrudGenerator } from './web-crud-generator'
import { WebCrudGeneratorSchema } from './web-crud-schema'

describe('web-crud generator', () => {
  let tree: Tree
  const options: WebCrudGeneratorSchema = { model: 'company', actor: 'manager', app: 'test' }

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()

    await createMockApiApp(tree, 'api')
    await apiFeatureGenerator(tree, { app: 'api', model: options.model })
    await createMockWebApp(tree, options.app)
    await webFeatureGenerator(tree, { app: options.app, model: options.model })
  })

  it('should run successfully', async () => {
    // await webCrudGenerator(tree, options)
    const config = readProjectConfiguration(tree, options.app)
    expect(config).toBeDefined()
  })

  it('should create crud with modelParentId', async () => {
    await webCrudGenerator(tree, { ...options, modelParent: 'User', modelParentId: 'ownerId' })
    const config = readProjectConfiguration(tree, 'test')
    expect(config).toBeDefined()

    const contents = getRecursiveFileContents({
      tree,
      path: 'libs/test',
    })
    expect(contents).toMatchSnapshot()
  })

  it('should create crud with modelOwnerId', async () => {
    await webCrudGenerator(tree, { ...options, modelOwnerId: 'ownerId' })
    const config = readProjectConfiguration(tree, 'test')
    expect(config).toBeDefined()

    const contents = getRecursiveFileContents({
      tree,
      path: 'libs/test',
    })
    expect(contents).toMatchSnapshot()
  })

  it('should create crud with modelOwnerId for admin and user', async () => {
    await webCrudGenerator(tree, { ...options, modelOwnerId: 'ownerId', actor: 'user' })
    await webCrudGenerator(tree, { ...options, modelOwnerId: 'ownerId', actor: 'admin' })
    const config = readProjectConfiguration(tree, 'test')
    expect(config).toBeDefined()

    const contents = getRecursiveFileContents({
      tree,
      path: 'libs/test',
    })
    expect(contents).toMatchSnapshot()
  })
})
