import * as Joi from 'joi'

export const validationSchema = Joi.object({
  API_URL: Joi.string().required().error(new Error(`API_URL is required.`)),
  // Discord Authentication
  AUTH_DISCORD_ADMIN_IDS: Joi.string(),
  AUTH_DISCORD_CLIENT_ID: Joi.string(),
  AUTH_DISCORD_CLIENT_SECRET: Joi.string(),
  AUTH_DISCORD_ENABLED: Joi.boolean().default(true),
  // GitHub Authentication
  AUTH_GITHUB_ADMIN_IDS: Joi.string(),
  AUTH_GITHUB_CLIENT_ID: Joi.string(),
  AUTH_GITHUB_CLIENT_SECRET: Joi.string(),
  AUTH_GITHUB_ENABLED: Joi.boolean().default(true),
  // Google Authentication
  AUTH_GOOGLE_ADMIN_IDS: Joi.string(),
  AUTH_GOOGLE_CLIENT_ID: Joi.string(),
  AUTH_GOOGLE_CLIENT_SECRET: Joi.string(),
  AUTH_GOOGLE_ENABLED: Joi.boolean().default(true),
  // Twitter Authentication
  AUTH_TWITTER_ADMIN_IDS: Joi.string(),
  AUTH_TWITTER_CONSUMER_KEY: Joi.string(),
  AUTH_TWITTER_CONSUMER_SECRET: Joi.string(),
  AUTH_TWITTER_ENABLED: Joi.boolean().default(true),
  // Username and Password Authentication
  AUTH_PASSWORD_ENABLED: Joi.boolean().default(true),
  AUTH_REGISTER_ENABLED: Joi.boolean().default(true),
  // Solana Authentication
  AUTH_SOLANA_ADMIN_IDS: Joi.string(),
  AUTH_SOLANA_ENABLED: Joi.boolean().default(true),
  // Cloak
  CLOAK_MASTER_KEY: Joi.string().required().error(new Error(`CLOAK_MASTER_KEY is required.`)),
  CLOAK_KEYCHAIN: Joi.string().required().error(new Error(`CLOAK_KEYCHAIN is required.`)),
  // Cookie
  COOKIE_NAME: Joi.string().default('__session'),
  COOKIE_SECURE: Joi.boolean().default(true),
  // Database
  DATABASE_PROVISION: Joi.boolean().default(false),
  DATABASE_URL: Joi.string(),
  GRAPHQL_PLAYGROUND: Joi.boolean().default(false),
  JWT_SECRET: Joi.string().required(),
  HOST: Joi.string().default('0.0.0.0'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  PORT: Joi.number().default(3000),
  SESSION_SECRET: Joi.string().required(),
  SYNC_DRY_RUN: Joi.boolean().default(false),
})
