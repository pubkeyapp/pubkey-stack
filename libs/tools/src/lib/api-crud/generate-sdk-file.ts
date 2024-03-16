import { getProjects, names, Tree } from '@nx/devkit'

export function generateSdkFile(
  tree: Tree,
  options: { actor: string; model: string; modelOwnerId?: string },
  fields: string[],
) {
  const project = getProjects(tree).get('sdk')

  if (!project) {
    // Soft fail if the project doesn't exist.
    console.log(`Could not find project: sdk, skipping...`)
    return
  }

  const sdkRoot = `${project.sourceRoot}/graphql`
  const sdkFile = `feature-${options.model}.graphql`
  const target = `${sdkRoot}/${sdkFile}`

  const exists = tree
    .children(sdkRoot)
    .filter((file) => file.endsWith('.graphql'))
    .includes(sdkFile)

  if (!exists) {
    // Write the fragment to the file if it doesn't exist.
    tree.write(target, sdkTemplateFragment(options.model, fields, options.modelOwnerId))
  }
  const content = tree.read(target)?.toString() ?? ''

  if (!content.includes(`input: ${options.actor}Create`)) {
    // Write the actor to the file.
    tree.write(target, content + sdkTemplateActor(options.model, options.actor))
  }
}

function sdkTemplateFragment(name: string, fields: string[], modelOwnerId?: string) {
  const { className } = names(name)
  return `fragment ${className}Details on ${className} {
  createdAt
  id
  ${fields.join('\n  ')}
  ${modelOwnerId ? modelOwnerId : ''}
  updatedAt
}
`
}

function sdkTemplateActor(name: string, actor: string) {
  const { className, propertyName } = names(name)
  const { className: classNameActor, propertyName: propertyNameActor } = names(actor)
  return `
query ${propertyNameActor}FindMany${className}($input: ${className}${classNameActor}FindManyInput!) {
  paging: ${propertyNameActor}FindMany${className}(input: $input) {
    data {
      ...${className}Details
    }
    meta {
      ...PagingMetaDetails
    }
  }
}

query ${propertyNameActor}FindOne${className}($${propertyName}Id: String!) {
  item: ${propertyNameActor}FindOne${className}(${propertyName}Id: $${propertyName}Id) {
    ...${className}Details
  }
}

mutation ${propertyNameActor}Create${className}($input: ${className}${classNameActor}CreateInput!) {
  created: ${propertyNameActor}Create${className}(input: $input) {
    ...${className}Details
  }
}

mutation ${propertyNameActor}Update${className}($${propertyName}Id: String!, $input: ${className}${classNameActor}UpdateInput!) {
  updated: ${propertyNameActor}Update${className}(${propertyName}Id: $${propertyName}Id, input: $input) {
    ...${className}Details
  }
}

mutation ${propertyNameActor}Delete${className}($${propertyName}Id: String!) {
  deleted: ${propertyNameActor}Delete${className}(${propertyName}Id: $${propertyName}Id)
}
`
}
