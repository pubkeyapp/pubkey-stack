import { Tree } from '@nrwl/devkit'
import { addConstructors } from './add-constructor'
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
    adminServiceFile,
    adminServiceClass,
  }: {
    importClass: string
    importPackage: string
    importProperty: string
    targetClass: string
    adminServiceFile?: string
    adminServiceClass?: string
  },
) {
  updateSourceFile(tree, path, (source) => {
    addNamedImport(source, importPackage, importClass)

    if (adminServiceFile) {
      addNamedImport(source, `./${adminServiceFile}`, adminServiceClass)
    }

    const constructors = [
      // Default constructor to core service from api-core-data-access
      { name: importProperty, type: importClass, private: true },
    ]

    if (adminServiceFile) {
      // Add admin constructor to admin service
      constructors.push({ name: 'admin', type: adminServiceClass, private: false })
    }

    addConstructors(source, targetClass, constructors)
    return source
  })
}
