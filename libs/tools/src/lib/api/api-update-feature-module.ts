import { Tree } from '@nrwl/devkit'
import { addNamedImport } from '../utils/add-named-import'
import { getDecoratorArgs } from '../utils/get-decorator-args'
import { updateSourceFile } from '../utils/update-source-file'

export function apiUpdateFeatureModule(
  tree: Tree,
  path: string,
  {
    dataAccessClass,
    dataAccessPackage,
    targetClass,
  }: {
    dataAccessClass: string
    dataAccessPackage: string
    targetClass: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    // Add CoreDataAccessModule Import to DataAccessModule
    addNamedImport(source, dataAccessPackage, dataAccessClass)

    // Get the module decorator
    const moduleDecorator = getDecoratorArgs(source, targetClass, 'Module')

    // Remove the 'controllers' property because it's not needed in the feature module
    const hasControllersProperty = moduleDecorator.getPropertyOrThrow('controllers')
    if (hasControllersProperty) {
      hasControllersProperty.remove()
    }

    // Remove the 'exports' property because it's not needed in the feature module
    const hasExportsProperty = moduleDecorator.getPropertyOrThrow('exports')
    if (hasExportsProperty) {
      hasExportsProperty.remove()
    }

    // Add the data-access module to the 'imports' property
    const hasImportsProperty = moduleDecorator.getProperty('imports')
    if (hasImportsProperty) {
      throw new Error(`apiImportModule: ${dataAccessClass} already has an 'imports' property`)
    }
    moduleDecorator.insertPropertyAssignment(0, {
      name: 'imports',
      initializer: `[${dataAccessClass}]`,
    })

    return source
  })
}
