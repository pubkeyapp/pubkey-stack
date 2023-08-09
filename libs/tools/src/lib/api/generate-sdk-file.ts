import { names, readProjectConfiguration, Tree } from '@nx/devkit'
import { NormalizedApiFeatureSchema } from '../../generators/api-feature/api-feature-schema'

export async function generateSdkFile(tree: Tree, options: NormalizedApiFeatureSchema) {
  const project = readProjectConfiguration(tree, `sdk`)

  if (!project) {
    throw new Error(`Could not find project: ${project}`)
  }

  const sdkRoot = `${project.sourceRoot}/graphql`
  const sdkFile = `feature-${options.name}.graphql`

  const exists = tree
    .children(sdkRoot)
    .filter((file) => file.endsWith('.graphql'))
    .includes(sdkFile)

  if (!exists) {
    tree.write(`${sdkRoot}/${sdkFile}`, sdkTemplate(options.name, options.label))
  }
}

function sdkTemplate(name: string, label: string) {
  const { className, propertyName } = names(name)
  return `fragment ${className}Details on ${className} {
  createdAt
  id
  ${label}
  updatedAt
}

query adminFindMany${className}s($input: AdminFindMany${className}Input!) {
  count: adminFindMany${className}sCount(input: $input) {
    ...PagingDetails
  }
  items: adminFindMany${className}s(input: $input) {
    ...${className}Details
  }
}

query adminFindOne${className}($${propertyName}Id: String!) {
  item: adminFindOne${className}(${propertyName}Id: $${propertyName}Id) {
    ...${className}Details
  }
}

mutation adminCreate${className}($input: AdminCreate${className}Input!) {
  created: adminCreate${className}(input: $input) {
    ...${className}Details
  }
}

mutation adminUpdate${className}($${propertyName}Id: String!, $input: AdminUpdate${className}Input!) {
  updated: adminUpdate${className}(${propertyName}Id: $${propertyName}Id, input: $input) {
    ...${className}Details
  }
}

mutation adminDelete${className}($${propertyName}Id: String!) {
  deleted: adminDelete${className}(${propertyName}Id: $${propertyName}Id)
}
`
}
