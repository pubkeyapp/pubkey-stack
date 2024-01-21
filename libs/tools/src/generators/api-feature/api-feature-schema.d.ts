export type ApiFeatureGeneratorSchema = Partial<Omit<NormalizedApiFeatureSchema, 'crud'>> & {
  crud?: string
}

export interface NormalizedApiFeatureSchema {
  app: string
  crud: string[]
  name: string
  label: string
  model: string
  npmScope: string
  skipDataAccess: boolean
  skipE2e: boolean
  skipFeature: boolean
  skipSdk: boolean
  skipUtil: boolean
}
