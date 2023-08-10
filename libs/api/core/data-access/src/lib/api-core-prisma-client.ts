import { PrismaClient } from '@prisma/client'

export const prismaClient = new PrismaClient()

export type ApiCorePrismaClient = typeof prismaClient
