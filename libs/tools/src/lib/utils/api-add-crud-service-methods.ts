import { Tree } from '@nrwl/devkit'
import { names } from '@nx/devkit'
import { dirname } from 'node:path'
import { addExport } from './add-export'
import { addNamedImport } from './add-named-import'
import { createCrudMethodNames } from './create-crud-method-names'
import { getDtoNames } from './get-dto-names'
import { getInputTypeContent } from './get-input-type-content'
import { getObjectTypeContent } from './get-object-type-content'
import { updateSourceFile } from './update-source-file'

export function apiAddCrudServiceMethods(
  tree: Tree,
  path: string,
  {
    modelName,
    pluralModelName,
    label,
    targetClass,
  }: { modelName: string; pluralModelName: string; label: string; targetClass: string },
) {
  const { modelClassName, updateInputClass, updateInputFile, createInputClass, createInputFile } = getDtoNames({
    modelName,
  })

  const { findManyMethod, findOneMethod, createMethod, updateMethod, deleteMethod } = createCrudMethodNames(
    modelName,
    pluralModelName,
  )

  const statement = `return this.core.data.${modelName}`
  const idProperty = names(`${modelName}-id`).propertyName

  // Create the DTO's for the create and update methods
  const dtoPath = dirname(path) + '/dto'
  const createInputDtoPath = `${dtoPath}/${names(createInputFile).fileName}.ts`
  const updateInputDtoPath = `${dtoPath}/${names(updateInputFile).fileName}.ts`

  tree.write(createInputDtoPath, getInputTypeContent(createInputClass, label))
  tree.write(updateInputDtoPath, getInputTypeContent(updateInputClass, label))

  // Create the entity file
  const entityFile = `${names(modelName).fileName}.entity.ts`
  const entityPath = `${dirname(path)}/entity/${entityFile}`
  tree.write(entityPath, getObjectTypeContent(modelClassName, label))

  // Add the exports to the barrel file
  const barrelPath = `${dirname(path)}/../index.ts`
  addExport(tree, barrelPath, `./lib/dto/${names(createInputFile).fileName}`)
  addExport(tree, barrelPath, `./lib/dto/${names(updateInputFile).fileName}`)
  addExport(tree, barrelPath, `./lib/entity/${entityFile}`)

  updateSourceFile(tree, path, (source) => {
    addNamedImport(source, `./dto/${names(createInputFile).fileName}`, createInputClass)
    addNamedImport(source, `./dto/${names(updateInputFile).fileName}`, updateInputClass)

    source.getClass(targetClass).addMethods([
      {
        isAsync: true,
        name: createMethod,
        parameters: [
          { name: 'adminId', type: 'string' },
          { name: 'input', type: createInputClass },
        ],
        statements: ['await this.core.ensureUserAdmin(adminId)', `${statement}.create({ data: input })`],
      },
      {
        isAsync: true,
        name: deleteMethod,
        parameters: [
          { name: 'adminId', type: 'string' },
          { name: `${idProperty}`, type: 'string' },
        ],
        statements: [
          'await this.core.ensureUserAdmin(adminId)',
          `${statement}.delete({ where: { id: ${idProperty} }})`,
        ],
      },
      {
        isAsync: true,
        name: findManyMethod,
        parameters: [{ name: 'adminId', type: 'string' }],
        statements: ['await this.core.ensureUserAdmin(adminId)', `${statement}.findMany()`],
      },
      {
        isAsync: true,
        name: findOneMethod,
        parameters: [
          { name: 'adminId', type: 'string' },
          { name: `${idProperty}`, type: 'string' },
        ],
        statements: [
          'await this.core.ensureUserAdmin(adminId)',
          `${statement}.findUnique({ where: { id: ${idProperty} } })`,
        ],
      },
      {
        isAsync: true,
        name: updateMethod,
        parameters: [
          { name: 'adminId', type: 'string' },
          { name: `${idProperty}`, type: 'string' },
          { name: 'input', type: updateInputClass },
        ],
        statements: [
          'await this.core.ensureUserAdmin(adminId)',
          `${statement}.update({ where: { id: ${idProperty} }, data: input })`,
        ],
      },
    ])

    return source
  })
}
