import { SourceFile } from 'ts-morph'

export function addNamedImport(source: SourceFile, importPackage: string, importClass: string) {
  return source.addImportDeclaration({ moduleSpecifier: importPackage, namedImports: [{ name: importClass }] })
}
