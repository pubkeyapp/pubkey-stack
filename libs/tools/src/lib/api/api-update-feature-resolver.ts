import { Tree } from '@nrwl/devkit'

import { addConstructors } from '../utils/add-constructors'
import { addNamedImport } from '../utils/add-named-import'
import { updateSourceFile } from '../utils/update-source-file'

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

    addConstructors(source, targetClass, [{ name: importProperty, type: dataAccessClass, private: true }])

    return source
  })
}
