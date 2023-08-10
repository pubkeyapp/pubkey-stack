import { Tree } from '@nrwl/devkit'
import { names } from '@nx/devkit'
import { addNamedImport } from '../utils/add-named-import'
import { updateSourceFile } from '../utils/update-source-file'
import { createCrudMethodNames } from './create-crud-method-names'
import { getDtoNames } from './get-dto-names'

export function apiAddCrudResolverMethods(
  tree: Tree,
  path: string,
  {
    authDataAccessImportPath,
    dataAccessImportPath,
    modelName,
    targetClass,
  }: {
    authDataAccessImportPath: string
    dataAccessImportPath: string
    modelName: string
    targetClass: string
  },
) {
  const { findManyInputClass, modelClassName, updateInputClass, createInputClass } = getDtoNames({
    modelName,
  })

  const { findManyMethod, findManyCountMethod, findOneMethod, createMethod, updateMethod, deleteMethod } =
    createCrudMethodNames(modelName, 'admin')

  const statement = `return this.service`
  const idProperty = names(`${modelName}-id`).propertyName

  updateSourceFile(tree, path, (source) => {
    addNamedImport(source, authDataAccessImportPath, ['ApiAuthGraphqlUserGuard', 'CtxUser'])
    addNamedImport(source, authDataAccessImportPath.replace('auth/', 'user/'), ['User'])
    addNamedImport(source, authDataAccessImportPath.replace('auth/', 'core/'), ['Paging'])
    addNamedImport(source, '@nestjs/graphql', ['Mutation', 'Query', 'Args'])
    addNamedImport(source, '@nestjs/common', ['UseGuards'])
    addNamedImport(source, dataAccessImportPath, [
      createInputClass,
      findManyInputClass,
      modelClassName,
      updateInputClass,
    ])

    source.getClass(targetClass).addDecorator({
      name: 'UseGuards',
      arguments: ['ApiAuthGraphqlUserGuard'],
    })

    source.getClass(targetClass).addMethods([
      {
        decorators: [{ name: 'Mutation', arguments: [`() => ${modelClassName}`, '{ nullable: true }'] }],
        name: createMethod,
        parameters: [ctxUserArgs(), inputArgs(createInputClass)],
        statements: [`${statement}.${createMethod.replace('adminC', 'admin.c')}(user.id, input)`],
      },
      {
        decorators: [{ name: `Mutation`, arguments: [`() => Boolean`, '{ nullable: true }'] }],
        name: deleteMethod,
        parameters: [ctxUserArgs(), idPropertyArgs(idProperty)],
        statements: [`${statement}.${deleteMethod.replace('adminD', 'admin.d')}(user.id, ${idProperty})`],
      },
      {
        decorators: [{ name: 'Query', arguments: [`() => [${modelClassName}]`, '{ nullable: true }'] }],
        name: findManyMethod,
        parameters: [ctxUserArgs(), inputArgs(findManyInputClass)],
        statements: [`${statement}.${findManyMethod.replace('adminF', 'admin.f')}(user.id, input)`],
      },
      {
        decorators: [{ name: 'Query', arguments: [`() => Paging`, '{ nullable: true }'] }],
        name: findManyCountMethod,
        parameters: [ctxUserArgs(), inputArgs(findManyInputClass)],
        statements: [`${statement}.${findManyCountMethod.replace('adminF', 'admin.f')}(user.id, input)`],
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
