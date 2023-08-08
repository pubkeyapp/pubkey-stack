import { OptionalKind, ParameterDeclarationStructure, Scope, SourceFile } from 'ts-morph'

export function addConstructor(source: SourceFile, type: string, name: string, targetClass: string) {
  const param: OptionalKind<ParameterDeclarationStructure> = {
    isReadonly: true,
    name,
    scope: Scope.Private,
    type,
  }

  source.getClass(targetClass).addConstructor({ parameters: [param] })
}
