import { Tree } from '@nrwl/devkit'
import { addNamedImport } from './add-named-import'
import { getDecoratorArgs } from './get-decorator-args'
import { updateSourceFile } from './update-source-file'

export function apiUpdateDataAccessModule(
  tree: Tree,
  path: string,
  {
    coreClass,
    corePackage,
    exportClass,
    targetClass,
  }: {
    coreClass: string
    corePackage: string
    exportClass: string
    targetClass: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    addNamedImport(source, corePackage, coreClass)

    const moduleDecorator = getDecoratorArgs(source, targetClass, 'Module')

    // Remove the 'controllers' property because it's not needed in the data-access module
    const hasControllersProperty = moduleDecorator.getPropertyOrThrow('controllers')
    if (hasControllersProperty) {
      hasControllersProperty.remove()
    }

    // Remove the 'exports' property, so we can add it back in the next step
    const hasExportsProperty = moduleDecorator.getPropertyOrThrow('exports')
    if (hasExportsProperty) {
      hasExportsProperty.remove()
    }
    moduleDecorator.insertPropertyAssignment(1, {
      name: 'exports',
      initializer: `[${exportClass}]`,
    })

    // Add CoreDataAccessModule to Imports array in DataAccessModule Class Decorator
    const hasImportsProperty = moduleDecorator.getProperty('imports')
    if (hasImportsProperty) {
      throw new Error(`apiImportModule: ${coreClass} already has an 'imports' property`)
    }
    moduleDecorator.insertPropertyAssignment(0, {
      name: 'imports',
      initializer: `[${coreClass}]`,
    })

    return source
  })
}
