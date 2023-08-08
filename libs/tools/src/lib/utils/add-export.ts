import { Tree } from '@nrwl/devkit'
import { updateSourceFile } from './update-source-file'

export function addExport(tree: Tree, path: string, exportPath: string) {
  updateSourceFile(tree, path, (source) => {
    source.addExportDeclaration({ moduleSpecifier: exportPath })
    return source
  })
}
