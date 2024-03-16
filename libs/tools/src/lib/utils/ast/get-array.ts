import { FunctionDeclaration, SourceFile, ts } from 'ts-morph'

export function getArray(source: SourceFile | FunctionDeclaration, name: string) {
  return source.getVariableDeclaration(name)?.getInitializerIfKind(ts.SyntaxKind.ArrayLiteralExpression)
}
