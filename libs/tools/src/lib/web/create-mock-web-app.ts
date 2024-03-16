import { getProjects, Tree } from '@nx/devkit'
import { Linter } from '@nx/eslint'
import { applicationGenerator, componentGenerator, libraryGenerator } from '@nx/react'

export async function createMockWebApp(tree: Tree, app: string) {
  // Build the mock app and core libs
  await applicationGenerator(tree, {
    directory: `apps/${app}`,
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    name: app,
    projectNameAndRootFormat: 'as-provided',
    routing: true,
    skipFormat: true,
    style: 'css',
  })
  // Create the core data access lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/core/data-access`,
    linter: Linter.EsLint,
    name: `${app}-core-data-access`,
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
    style: 'css',
  })

  // Create the core feature lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/core/feature`,
    linter: Linter.EsLint,
    name: `${app}-core-feature`,
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
    style: 'css',
  })

  // Create the user feature lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/user/feature`,
    linter: Linter.EsLint,
    name: `${app}-user-feature`,
    projectNameAndRootFormat: 'as-provided',
    skipFormat: true,
    style: 'css',
  })

  // Create the core feature lib
  await createMockComponent(tree, `${app}-core-feature`, `${app}-core-feature`)

  // Create the core routes libs
  await createMockComponent(tree, `${app}-core-feature`, `${app}-core-routes`)
  await createMockComponent(tree, `${app}-core-feature`, `${app}-core-routes-admin`, getEmptyRoutesFile())
  await createMockComponent(tree, `${app}-core-feature`, `${app}-core-routes-user`, getEmptyRoutesFile())
  await createMockComponent(tree, `${app}-core-feature`, `${app}-core-routes-manager`, getEmptyRoutesFile())

  // Create the admin-user-detail-feature
  await createMockComponent(
    tree,
    `${app}-user-feature`,
    `admin-user-detail-feature`,
    `export function AdminUserDetailFeature() {
  const { userId } = useParams<{ userId: string }>() as { userId: string }
  const tabs = [
    { path: 'settings', label: 'Settings', element: <AdminUserDetailFeatureSettings userId={userId} /> },
    { path: 'identities', label: 'Identities', element: <AdminUserDetailFeatureIdentities userId={userId} /> },
  ]
  return <UiTabRoutes tabs={tabs} />
}`,
  )
}

async function createMockComponent(tree: Tree, project: string, name: string, content?: string) {
  const config = getProjects(tree).get(project)
  await componentGenerator(tree, {
    name,
    directory: `${config.sourceRoot}/lib/`,
    nameAndDirectoryFormat: 'as-provided',
    style: 'none',
    skipTests: true,
    skipFormat: true,
  })
  if (!content) {
    return
  }
  const filename = `${config.sourceRoot}/lib/${name}.tsx`
  if (content && tree.exists(filename)) {
    tree.write(filename, content)
  }
}

function getEmptyRoutesFile(): string {
  return [
    `import { RouteObject, useRoutes } from 'react-router-dom'`,
    `const links = []`,
    `const routes = []`,
    `export default function() { return useRoutes(routes) }`,
  ].join('\n')
}
