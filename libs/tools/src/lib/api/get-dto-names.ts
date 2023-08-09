import { names } from '@nx/devkit'

export function getDtoNames({ modelName }: { modelName: string }) {
  const modelClassName = names(modelName).className
  const createInputFile = `admin-create-${modelClassName}.input`
  const createInputClass = names(createInputFile).className
  const findManyHelperFile = `parse-admin-find-many-${modelClassName}`
  const findManyInputFile = `admin-find-many-${modelClassName}.input`
  const findManyInputClass = names(findManyInputFile).className
  const updateInputFile = `admin-update-${modelClassName}.input`
  const updateInputClass = names(updateInputFile).className

  return {
    createInputClass,
    createInputFile,
    findManyHelperFile,
    findManyInputClass,
    findManyInputFile,
    modelClassName,
    updateInputClass,
    updateInputFile,
  }
}
