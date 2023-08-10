import { Tree } from '@nrwl/devkit'
import { names } from '@nx/devkit'
import { dirname } from 'node:path'
import { addExport } from '../utils/add-export'
import { addNamedImport } from '../utils/add-named-import'
import { updateSourceFile } from '../utils/update-source-file'
import { createCrudMethodNames } from './create-crud-method-names'
import { getDtoNames } from './get-dto-names'
import { getFindManyHelper } from './get-find-many-helper'
import { getInputTypeCreateUpdate } from './get-input-type-create-update'
import { getInputTypeFindMany } from './get-input-type-find-many'
import { getObjectTypeContent } from './get-object-type-content'

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
  const {
    createInputClass,
    createInputFile,
    findManyHelperFile,
    findManyInputClass,
    findManyInputFile,
    modelClassName,
    updateInputClass,
    updateInputFile,
  } = getDtoNames({
    modelName,
  })

  const { createMethod, deleteMethod, findManyCountMethod, findManyMethod, findOneMethod, updateMethod } =
    createCrudMethodNames(modelName, pluralModelName)

  const statement = `this.core.data.${names(modelName).propertyName}`
  const idProperty = names(`${modelName}-id`).propertyName

  // Create the DTO's for the create and update methods
  const basePath = dirname(path)
  const dtoPath = `${basePath}/dto`
  const helpersPath = `${basePath}/helpers`

  const createInputDtoPath = `${dtoPath}/${names(createInputFile).fileName}.ts`
  const findManyHelper = `${helpersPath}/${names(findManyHelperFile).fileName}.ts`
  const findManyInputDtoPath = `${dtoPath}/${names(findManyInputFile).fileName}.ts`
  const updateInputDtoPath = `${dtoPath}/${names(updateInputFile).fileName}.ts`

  tree.write(createInputDtoPath, getInputTypeCreateUpdate(createInputClass, `${label}!`))
  tree.write(findManyHelper, getFindManyHelper(findManyHelperFile, findManyInputClass, findManyInputFile, modelName))
  tree.write(findManyInputDtoPath, getInputTypeFindMany(findManyInputClass))
  tree.write(updateInputDtoPath, getInputTypeCreateUpdate(updateInputClass, `${label}?`))

  // Create the entity file
  const entityFile = `${names(modelName).fileName}.entity.ts`
  const entityPath = `${dirname(path)}/entity/${entityFile}`
  tree.write(entityPath, getObjectTypeContent(modelClassName, label))

  const { propertyName: parsePropertyName } = names(findManyHelperFile)

  // Add the exports to the barrel file
  const barrelPath = `${dirname(path)}/../index.ts`
  addExport(tree, barrelPath, `./lib/dto/${names(createInputFile).fileName}`)
  addExport(tree, barrelPath, `./lib/dto/${names(findManyInputFile).fileName}`)
  addExport(tree, barrelPath, `./lib/dto/${names(updateInputFile).fileName}`)
  addExport(tree, barrelPath, `./lib/entity/${entityFile}`)

  updateSourceFile(tree, path, (source) => {
    addNamedImport(source, `./dto/${names(createInputFile).fileName}`, createInputClass)
    addNamedImport(source, `./dto/${names(findManyInputFile).fileName}`, findManyInputClass)
    addNamedImport(source, `./dto/${names(updateInputFile).fileName}`, updateInputClass)
    addNamedImport(source, `./helpers/${names(findManyHelperFile).fileName}`, parsePropertyName)

    source.getClass(targetClass).addMethods([
      {
        isAsync: true,
        name: createMethod,
        parameters: [
          { name: 'adminId', type: 'string' },
          { name: 'input', type: createInputClass },
        ],
        statements: ['await this.core.ensureUserAdmin(adminId)', `return ${statement}.create({ data: input })`],
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
          `const deleted = await ${statement}.delete({ where: { id: ${idProperty} }})`,
          `return !!deleted`,
        ],
      },
      {
        isAsync: true,
        name: findManyMethod,
        parameters: [
          { name: 'adminId', type: 'string' },
          { name: 'input', type: findManyInputClass },
        ],
        statements: [
          'await this.core.ensureUserAdmin(adminId)',
          `const { where, orderBy, take, skip } = ${parsePropertyName}(input)`,
          `const items = await ${statement}.findMany({ where, orderBy, take, skip })`,
          `return items ?? []`,
        ],
      },
      {
        isAsync: true,
        name: findManyCountMethod,
        parameters: [
          { name: 'adminId', type: 'string' },
          { name: 'input', type: findManyInputClass },
        ],
        statements: [
          'await this.core.ensureUserAdmin(adminId)',
          `const { where, orderBy, take, skip } = ${parsePropertyName}(input)`,
          `const [count, total] = await Promise.all([${statement}.count({ where, orderBy, take, skip }), ${statement}.count({ where, orderBy }), ])`,
          `return { count, skip, take, total }`,
        ],
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
          `return ${statement}.findUnique({ where: { id: ${idProperty} } })`,
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
          `return ${statement}.update({ where: { id: ${idProperty} }, data: input })`,
        ],
      },
    ])

    return source
  })
}
