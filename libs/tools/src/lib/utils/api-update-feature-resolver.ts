import { Tree } from '@nrwl/devkit'
import { addConstructor } from './add-constructor'
import { addNamedImport } from './add-named-import'
import { updateSourceFile } from './update-source-file'

export function apiUpdateFeatureResolver(
  tree: Tree,
  path: string,
  {
    dataAccessClass,
    dataAccessPackage,
    importProperty,
    targetClass,
  }: {
    dataAccessClass: string
    dataAccessPackage: string
    importProperty: string
    targetClass: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    addNamedImport(source, dataAccessPackage, dataAccessClass)

    addConstructor(source, dataAccessClass, importProperty, targetClass)

    return source
  })
}
