import { SourceFile } from 'ts-morph'
import { getArray } from './get-array'

export function addArrayItemInFunction(
  source: SourceFile,
  { name, content }: { name: string; content: string },
  functionName: string,
) {
  const functionDeclaration = source.getFunction(functionName)

  if (!functionDeclaration) {
    console.log(`Function ${functionName} not found in file ${source.getFilePath()}`)
    return
  }
  const array = getArray(functionDeclaration, name)
  if (!array) {
    console.log(`Array ${name} not found in function ${functionName}`)
    return
  }
  array.addElement(content)

  return source
}
