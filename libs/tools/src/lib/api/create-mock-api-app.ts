import { Tree } from '@nx/devkit'
import { applicationGenerator, libraryGenerator, serviceGenerator } from '@nx/nest'

export async function createMockApiApp(tree: Tree, app: string) {
  // Build the mock app and core libs
  await applicationGenerator(tree, { name: app, directory: 'apps', skipFormat: true })
  // Create the core data access lib
  await libraryGenerator(tree, { name: `data-access`, directory: `libs/${app}/core`, skipFormat: true })
  // Create the core service
  await serviceGenerator(tree, {
    directory: 'lib',
    flat: true,
    name: `${app}-core`,
    project: `${app}-core-data-access`,
    skipFormat: true,
  })
  // Create the core feature lib
  await libraryGenerator(tree, { name: `feature`, directory: `libs/${app}/core`, skipFormat: true })
}
