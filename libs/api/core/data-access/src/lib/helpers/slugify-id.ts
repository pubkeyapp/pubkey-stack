import slugify from 'slugify'

export function slugifyId(id: string): string {
  return slugify(id, { lower: true, strict: true })
}
