import type { CodegenConfig } from '@graphql-codegen/cli'
import { join } from 'node:path'
import * as process from 'process'

const config: CodegenConfig = {
  overwrite: true,
  schema: join(process.cwd(), './api-schema.graphql'),
  documents: ['./graphql/**/*.graphql'],
  generates: {
    './generated/graphql-sdk.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        'typescript-validation-schema',
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
      ],
      config: {
        rawRequest: true,
        scalars: {
          DateTime: 'Date',
        },
        schema: 'zod',
      },
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
}

export default config
