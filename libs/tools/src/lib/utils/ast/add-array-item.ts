import { SourceFile } from 'ts-morph'
import { getArray } from './get-array'

export function addArrayItem(source: SourceFile, { name, content }: { name: string; content: string }) {
  const array = getArray(source, name)

  if (!array) {
    console.log(`Array ${name} not found in file ${source.getFilePath()}`)
    return
  }
  array.addElement(content)
  return source
}
