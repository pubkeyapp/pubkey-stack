import { Tree } from '@nrwl/devkit'
import { addConstructor } from './add-constructor'
import { addNamedImport } from './add-named-import'
import { updateSourceFile } from './update-source-file'

export function apiUpdateDataAccessService(
  tree: Tree,
  path: string,
  {
    importClass,
    importPackage,
    importProperty,
    targetClass,
  }: {
    importClass: string
    importPackage: string
    importProperty: string
    targetClass: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    addNamedImport(source, importPackage, importClass)
    addConstructor(source, importClass, importProperty, targetClass)
    return source
  })
}
