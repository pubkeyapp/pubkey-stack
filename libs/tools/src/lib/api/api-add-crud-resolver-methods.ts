import { Tree } from '@nrwl/devkit'
import { names } from '@nx/devkit'
import { addNamedImport } from '../utils/add-named-import'
import { createCrudMethodNames } from './create-crud-method-names'
import { getDtoNames } from './get-dto-names'
import { updateSourceFile } from '../utils/update-source-file'

export function apiAddCrudResolverMethods(
  tree: Tree,
  path: string,
  {
    authDataAccessImportPath,
    dataAccessImportPath,
    modelName,
    pluralModelName,
    targetClass,
  }: {
    authDataAccessImportPath: string
    dataAccessImportPath: string
    modelName: string
    pluralModelName: string
    targetClass: string
  },
) {
  const { modelClassName, updateInputClass, createInputClass } = getDtoNames({
    modelName,
  })

  const { findManyMethod, findOneMethod, createMethod, updateMethod, deleteMethod } = createCrudMethodNames(
    modelName,
    pluralModelName,
    'admin',
  )

  const statement = `return this.service`
  const idProperty = names(`${modelName}-id`).propertyName

  updateSourceFile(tree, path, (source) => {
    addNamedImport(source, authDataAccessImportPath, ['ApiAuthGraphqlGuard', 'CtxUser'])
    addNamedImport(source, authDataAccessImportPath.replace('auth/', 'user/'), ['User'])
    addNamedImport(source, '@nestjs/graphql', ['Mutation', 'Query', 'Args'])
    addNamedImport(source, '@nestjs/common', ['UseGuards'])
    addNamedImport(source, dataAccessImportPath, [createInputClass, updateInputClass, modelClassName])

    source.getClass(targetClass).addDecorator({
      name: 'UseGuards',
      arguments: ['ApiAuthGraphqlGuard'],
    })

    source.getClass(targetClass).addMethods([
      {
        decorators: [{ name: 'Mutation', arguments: [`() => ${modelClassName}`, '{ nullable: true }'] }],
        name: createMethod,
        parameters: [ctxUserArgs(), inputArgs(createInputClass)],
        statements: [`${statement}.${createMethod.replace('adminC', 'admin.c')}(user.id, input)`],
      },
      {
        decorators: [{ name: `Mutation`, arguments: [`() => ${modelClassName}`, '{ nullable: true }'] }],
        name: deleteMethod,
        parameters: [ctxUserArgs(), idPropertyArgs(idProperty)],
        statements: [`${statement}.${deleteMethod.replace('adminD', 'admin.d')}(user.id, ${idProperty})`],
      },
      {
        decorators: [{ name: 'Query', arguments: [`() => [${modelClassName}]`, '{ nullable: true }'] }],
        name: findManyMethod,
        parameters: [ctxUserArgs()],
        statements: [`${statement}.${findManyMethod.replace('adminF', 'admin.f')}(user.id)`],
      },
      {
        decorators: [{ name: 'Query', arguments: [`() => ${modelClassName}`, '{ nullable: true }'] }],
        name: findOneMethod,
        parameters: [ctxUserArgs(), idPropertyArgs(idProperty)],
        statements: [`${statement}.${findOneMethod.replace('adminF', 'admin.f')}(user.id, ${idProperty})`],
      },
      {
        decorators: [{ name: 'Mutation', arguments: [`() => ${modelClassName}`, '{ nullable: true }'] }],
        name: updateMethod,
        parameters: [ctxUserArgs(), idPropertyArgs(idProperty), inputArgs(updateInputClass)],
        statements: [`${statement}.${updateMethod.replace('adminU', 'admin.u')}(user.id, ${idProperty}, input)`],
      },
    ])

    return source
  })
}

function idPropertyArgs(idProperty: string) {
  return {
    name: `${idProperty}`,
    type: 'string',
    decorators: [{ name: 'Args', arguments: [`'${idProperty}'`] }],
  }
}

function inputArgs(inputClass: string) {
  return {
    name: 'input',
    type: inputClass,
    decorators: [{ name: 'Args', arguments: [`'input'`] }],
  }
}

function ctxUserArgs() {
  return {
    name: 'user',
    type: 'User',
    decorators: [{ name: 'CtxUser()' }],
  }
}
