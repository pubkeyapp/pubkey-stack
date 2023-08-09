import { Tree } from '@nx/devkit'
import { Linter } from '@nx/linter'
import { applicationGenerator, componentGenerator, libraryGenerator } from '@nx/react'

export async function createMockWebApp(tree: Tree, app: string) {
  // Build the mock app and shell libs
  await applicationGenerator(tree, {
    directory: 'apps',
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    name: app,
    routing: true,
    skipFormat: true,
    style: 'css',
  })
  // Create the shell data access lib
  await libraryGenerator(tree, {
    linter: Linter.EsLint,
    style: 'css',
    name: `data-access`,
    directory: `libs/${app}/shell`,
    skipFormat: true,
  })

  // Create the shell feature lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/shell`,
    linter: Linter.EsLint,
    name: `feature`,
    skipFormat: true,
    style: 'css',
  })

  // Create the shell feature lib
  await createMockComponent(tree, `${app}-shell-feature`, `${app}-shell-feature`)

  // Create the shell routes libs
  await createMockComponent(tree, `${app}-shell-feature`, `${app}-shell.routes`)
  await createMockComponent(tree, `${app}-shell-feature`, `${app}-admin.routes`)
}

function createMockComponent(tree: Tree, project: string, name: string) {
  return componentGenerator(tree, {
    name,
    project,
    style: 'none',
    flat: true,
    skipTests: true,
  })
}
