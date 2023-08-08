export * from './generated/graphql-sdk'
export * from './lib/response-middleware'
export * from './lib/get-graphql-client'
export * from './lib/get-graphql-sdk'
export * from './lib/verify-signature'

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}
