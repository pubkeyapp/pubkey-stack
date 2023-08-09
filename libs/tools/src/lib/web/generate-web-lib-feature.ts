import { generateFiles, readProjectConfiguration, Tree } from '@nx/devkit'
import { join } from 'node:path'
import { NormalizedWebFeatureSchema } from '../../generators/web-feature/web-feature-schema'
import { addNamedImport } from '../utils/add-named-import'
import { updateSourceFile } from '../utils/update-source-file'
import { getWebModuleInfo } from './get-web-module-info'

export async function generateWebLibFeature(tree: Tree, options: NormalizedWebFeatureSchema, npmScope: string) {
  const { project, barrel, className, fileName, propertyName } = getWebModuleInfo(
    tree,
    options.app,
    'feature',
    options.name,
    options.modelName,
  )

  if (!options.skipAdminCrud) {
    generateFiles(tree, join(__dirname, './files/feature'), project.sourceRoot, {
      app: options.app,
      label: options.label,
      modelClassName: className,
      modelFileName: fileName,
      modelPropertyName: propertyName,
      npmScope,
    })

    tree.write(
      barrel,
      `import { lazy } from 'react'

export const WebAdmin${className}Routes = lazy(() => import('./lib/web-admin-${fileName}.routes'))
`,
    )

    const shellProject = readProjectConfiguration(tree, `${options.app}-shell-feature`)
    if (!shellProject) {
      throw new Error(`Could not find shell project for ${options.app}`)
    }

    const adminRoutes = `${shellProject.sourceRoot}/lib/web-admin.routes.tsx`
    const adminRoutesContent = tree.read(adminRoutes).toString('utf-8')

    // Find admin shell routes and add the new route
    const placeholderLink = `// GENERATE_ADMIN_DASHBOARD_LINK`
    const placeholderRoute = `// GENERATE_ADMIN_DASHBOARD_ROUTE`

    if (!adminRoutesContent.includes(placeholderLink) || !adminRoutesContent.includes(placeholderRoute)) {
      // Skipping generation because the placeholder is missing
      console.warn(`WARNING: Skipping generation of admin routes for ${options.app} because the placeholder is missing`)
      return
    }

    const itemLink = `{ label: '${className}s', icon: IconUsers, link: '/admin/${fileName}s' }`
    const itemRoute = `{ path: '${fileName}s/*', element: <WebAdmin${className}Routes /> }`

    tree.write(
      adminRoutes,
      adminRoutesContent
        .replace(placeholderLink, `${itemLink},\n${placeholderLink}`)
        .replace(placeholderRoute, `${itemRoute},\n${placeholderRoute}`),
    )

    updateSourceFile(tree, adminRoutes, (source) => {
      addNamedImport(source, `@${npmScope}/${options.app}/${options.name}/feature`, `WebAdmin${className}Routes`)
      return source
    })
  }
}
