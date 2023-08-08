export interface ApiFeatureGeneratorSchema {
  app?: string
  name: string
  label?: string
  modelName?: string
  pluralModelName?: string
  skipAdminCrud?: boolean
  skipDataAccess?: boolean
  skipFeature?: boolean
  skipUtil?: boolean
}
