import { Logger } from '@nestjs/common'
import { ServeStaticModuleOptions } from '@nestjs/serve-static'
import { compareSync, hashSync } from 'bcrypt'
import { existsSync } from 'node:fs'
import { join } from 'path'
import slugify from 'slugify'

export function hashPassword(password: string): string {
  return hashSync(password, 10)
}

export function validatePassword(password: string, hashedPassword: string): boolean {
  return compareSync(password, hashedPassword)
}

export function slugifyId(id: string): string {
  return slugify(id, { lower: true, strict: true })
}

export function serveStaticFactory() {
  return function (): ServeStaticModuleOptions[] {
    const rootPath = join(__dirname, '..', 'web')
    const rootExists = existsSync(rootPath)

    if (!rootExists) {
      Logger.verbose(`Static Hosting disabled: root path does not exist: ${rootPath}.`)
      return []
    }

    Logger.verbose(`Static Hosting enabled for: ${rootPath}.`)
    return [
      {
        rootPath,
        exclude: ['/api/*', '/graphql'],
      },
    ]
  }
}

export type AvatarVariant = 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus'
export interface AvatarOptions {
  variant?: AvatarVariant
  square?: boolean
}
export function getAvatarUrl(name?: string, options: AvatarOptions = {}): string {
  if (!name) {
    return ''
  }
  const variant = options.variant ?? 'pixel'
  const square = options.square ?? false
  const colors = ['412973', '753979', 'B1476D', 'EB9064', 'BED9C8']
  return `https://source.boringavatars.com/${variant}/120/${name}?colors=${colors.join(',')}${square ? '&square' : ''}`
}
