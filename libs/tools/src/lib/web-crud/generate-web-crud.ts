import { generateFiles, ProjectConfiguration, Tree } from '@nx/devkit'

import { NormalizedApiCrudSchema } from '../api-crud/normalized-api-crud.schema'
import { addArrayItem } from '../utils/ast/add-array-item'
import { addArrayItemInFunction } from '../utils/ast/add-array-item-in-function'
import { addExports } from '../utils/ast/add-export'
import { addNamedImport } from '../utils/ast/add-named-import'
import { updateSourceFile } from '../utils/ast/update-source-file'
import { ensureNxProjectExists } from '../utils/ensure-nx-project-exists'
import { getWebCrudSubstitutions } from './get-web-crud-substitutions'

const defaultIconMap: Record<string, string> = {
  App: 'IconApps',
  Category: 'IconCategory',
  Company: 'IconBuilding',
  Integration: 'IconPuzzle',
  Network: 'IconNetwork',
  Project: 'IconProject',
  Server: 'IconServer',
  Tag: 'IconTag',
  User: 'IconUser',
}

function getDefaultIcon(className: string) {
  return defaultIconMap[className] || 'IconSettings'
}

export function generateWebCrud(tree: Tree, options: NormalizedApiCrudSchema) {
  const vars = getWebCrudSubstitutions(options)
  const projects: ProjectConfiguration[] = [
    `${vars.app.fileName}-${vars.model.fileName}-data-access`,
    `${vars.app.fileName}-${vars.model.fileName}-feature`,
    `${vars.app.fileName}-${vars.model.fileName}-ui`,
    `${vars.app.fileName}-core-feature`,
    `${vars.app.fileName}-user-feature`,
  ].map((project) => ensureNxProjectExists(tree, project))

  const [dataAccess, feature, ui, coreFeature, userFeature] = projects

  const requiredFiles = [
    `${coreFeature.sourceRoot}/lib/${options.app}-core-routes-${vars.actor.fileName}.tsx`,
    `${coreFeature.sourceRoot}/lib/${options.app}-core-routes-${vars.actor.fileName}.tsx`,
    `${feature.sourceRoot}/index.ts`,
  ]
  for (const file of requiredFiles) {
    if (!tree.exists(file)) {
      throw new Error(`Required file not found: ${file}`)
    }
  }

  const [adminRoutes, userRoutes, featureIndex] = requiredFiles

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
    `export const ${vars.actor.className}${vars.model.className}Feature = lazy(() => import('./lib/${vars.actor.fileName}-${vars.model.fileName}.routes'))`,
  ]

  const importSnippet = `import { lazy } from 'react'`
  // Check if the featureIndex file already has the above import featureIndex
  if (!tree.read(featureIndex).toString().includes(importSnippet)) {
    imports.unshift(importSnippet)
  }

  // Add the imports to the featureIndex file
  const indexContent = tree.read(featureIndex)
  tree.write(featureIndex, [indexContent, ...imports].join('\n'))

  const defaultIcon = getDefaultIcon(vars.model.className)
  const routesFileContent = tree.read(routesFile).toString()
  if (!routesFileContent.includes(defaultIcon)) {
    tree.write(routesFile, [`import { ${defaultIcon} } from '@tabler/icons-react'`, routesFileContent].join('\n'))
  }

  const label = ucfirst(vars.plural.fileName)
  const path = `${vars.plural.fileName}`
  const to = `${vars.actorAdmin ? '/admin/' : `/`}${vars.plural.fileName}`
  const link = {
    name: 'links',
    content: `{ label: '${label}', icon: ${defaultIcon}, to: '${to}' },`,
  }
  const route = {
    name: 'routes',
    content: `{ path: '/${path}/*', element: <${vars.actor.className}${vars.model.className}Feature /> },`,
  }
  const tabs = {
    name: 'tabs',
    content: `{ path: '${path}', label: '${label}', element: <${vars.actor.className}${vars.model.className}Feature ${vars.ownerId}={userId} /> },`,
  }

  // If we add an owner, we want to add the admin link and route to the user detail feature
  if (options.modelOwnerId && options.actor === 'admin') {
    const userDetailFeature = `${userFeature.sourceRoot}/lib/admin-user-detail-feature.tsx`
    if (tree.exists(userDetailFeature)) {
      updateSourceFile(tree, userDetailFeature, (source) => {
        addArrayItemInFunction(source, tabs, 'AdminUserDetailFeature')
        addNamedImport(
          source,
          `@${vars.npmScope}/${vars.app.fileName}-${vars.model.fileName}-feature`,
          `${vars.actor.className}${vars.model.className}Feature`,
        )
        return source
      })
    } else {
      console.warn('File not found:', userDetailFeature)
    }
  } else {
    updateSourceFile(tree, routesFile, (source) => {
      addArrayItem(source, link)
      addArrayItem(source, route)
      addNamedImport(
        source,
        `@${vars.npmScope}/${vars.app.fileName}-${vars.model.fileName}-feature`,
        `${vars.actor.className}${vars.model.className}Feature`,
      )
      return source
    })
  }

  // Generate the ui library
  generateFiles(tree, `${__dirname}/files/ui`, ui.sourceRoot, { ...vars })

  // Add the exports to the barrel file
  addExports(tree, `${ui.sourceRoot}/index.ts`, [
    `./lib/${vars.actor.fileName}-${vars.model.fileName}-ui-create-form`,
    `./lib/${vars.actor.fileName}-${vars.model.fileName}-ui-table`,
    `./lib/${vars.actor.fileName}-${vars.model.fileName}-ui-update-form`,
    `./lib/${vars.model.fileName}-ui-avatar`,
    `./lib/${vars.model.fileName}-ui-grid`,
    `./lib/${vars.model.fileName}-ui-grid-item`,
    `./lib/${vars.model.fileName}-ui-info`,
    `./lib/${vars.model.fileName}-ui-item`,
  ])
}

function ucfirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
