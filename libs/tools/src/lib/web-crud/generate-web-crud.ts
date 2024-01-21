import { generateFiles, type ProjectConfiguration, Tree } from '@nx/devkit'
import type { NormalizedApiCrudSchema } from '../../generators/api-crud/api-crud-schema'
import { addArrayItem } from '../utils/add-array-item'
import { addExports } from '../utils/add-export'
import { addNamedImport } from '../utils/add-named-import'
import { ensureNxProjectExists } from '../utils/ensure-nx-project-exists'
import { updateSourceFile } from '../utils/update-source-file'
import { getWebCrudSubstitutions } from './get-web-crud-substitutions'

export function generateWebCrud(tree: Tree, options: NormalizedApiCrudSchema) {
  const vars = getWebCrudSubstitutions(options)
  const projects: ProjectConfiguration[] = [
    `${vars.app.fileName}-${vars.model.fileName}-data-access`,
    `${vars.app.fileName}-${vars.model.fileName}-feature`,
    `${vars.app.fileName}-${vars.model.fileName}-ui`,
    `${vars.app.fileName}-shell-feature`,
  ].map((project) => ensureNxProjectExists(tree, project))

  const [dataAccess, feature, ui, shellFeature] = projects

  const requiredFields = [
    `${shellFeature.sourceRoot}/lib/shell-${vars.actor.fileName}.routes.tsx`,
    `${shellFeature.sourceRoot}/lib/shell-${vars.actor.fileName}.routes.tsx`,
    `${feature.sourceRoot}/index.ts`,
  ]
  for (const field of requiredFields) {
    if (!tree.exists(field)) {
      throw new Error(`Required file not found: ${field}`)
    }
  }

  const [adminRoutes, userRoutes, featureIndex] = requiredFields

  const routesFile = vars.actorAdmin ? adminRoutes : userRoutes

  // Generate the data access library
  generateFiles(tree, `${__dirname}/files/data-access`, dataAccess.sourceRoot, { ...vars })

  // Add the exports to the barrel file
  addExports(tree, `${dataAccess.sourceRoot}/index.ts`, [
    `./lib/use-${vars.actor.fileName}-find-many-${vars.model.fileName}`,
    `./lib/use-${vars.actor.fileName}-find-one-${vars.model.fileName}`,
  ])

  // Generate the feature library
  generateFiles(tree, `${__dirname}/files/feature`, feature.sourceRoot, { ...vars })

  const imports = [
    `export const ${vars.actor.className}${vars.model.className}Feature = lazy(() => import('./lib/${vars.actor.fileName}-${vars.actor.fileName}.routes'))`,
  ]

  const importSnippet = `import { lazy } from 'react'`
  // Check if the featureIndex file already has the above import featureIndex
  if (!tree.read(featureIndex).toString().includes(importSnippet)) {
    imports.push(importSnippet)
  }

  // Add the imports to the featureIndex file
  addExports(tree, featureIndex, imports)

  const link = {
    name: 'links',
    content: `{ label: '${vars.plural.className}', icon: IconUsers, to: '/admin/${vars.plural.fileName}' },`,
  }
  const route = {
    name: 'routes',
    content: `{ path: '${vars.plural.fileName}/*', element: <${vars.actor.className}${vars.model.className}Feature /> },`,
  }

  updateSourceFile(tree, routesFile, (source) => {
    addArrayItem(source, link)
    addArrayItem(source, route)
    return source
  })

  updateSourceFile(tree, routesFile, (source) => {
    addNamedImport(
      source,
      `@${vars.npmScope}/${vars.app.fileName}-${vars.model.fileName}-feature`,
      `${vars.actor.className}${vars.model.className}Feature`,
    )
    return source
  })

  // Generate the ui library
  generateFiles(tree, `${__dirname}/files/feature`, ui.sourceRoot, { ...vars })

  // Add the exports to the barrel file
  addExports(tree, `${ui.sourceRoot}/index.ts`, [
    `./lib/${vars.actor.fileName}-${vars.model.fileName}-ui-create-form`,
    `./lib/${vars.actor.fileName}-${vars.model.fileName}-ui-table`,
    `./lib/${vars.actor.fileName}-${vars.model.fileName}-ui-update-form`,
  ])
}
