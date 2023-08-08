import { readProjectConfiguration, Tree } from '@nx/devkit'

export function ensureAppExists(tree: Tree, name: string) {
  if (!name) {
    throw new Error(`App name is required`)
  }

  const config = readProjectConfiguration(tree, name)

  if (!config) {
    throw new Error(`App "${name}" does not exist`)
  }
}
