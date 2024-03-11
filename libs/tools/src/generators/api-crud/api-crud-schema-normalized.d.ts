export interface NormalizedApiCrudSchema extends ApiCrudGeneratorSchema {
  label: string
  npmScope: string
  fields?: PrismaModelField[]
}
