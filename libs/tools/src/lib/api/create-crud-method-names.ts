import { names } from '@nx/devkit'

export function createCrudMethodNames(modelName: string, prefix = '') {
  const model = names(modelName).className

  return {
    createMethod: names(`${prefix ? prefix + '-' : ''}create${model}`).propertyName,
    deleteMethod: names(`${prefix ? prefix + '-' : ''}delete${model}`).propertyName,
    findManyMethod: names(`${prefix ? prefix + '-' : ''}findMany${model}`).propertyName,
    findManyCountMethod: names(`${prefix ? prefix + '-' : ''}findMany${model}Count`).propertyName,
    findOneMethod: names(`${prefix ? prefix + '-' : ''}findOne${model}`).propertyName,
    updateMethod: names(`${prefix ? prefix + '-' : ''}update${model}`).propertyName,
  }
}
