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
  skipFeature: boolean
  skipUtil: boolean
}
