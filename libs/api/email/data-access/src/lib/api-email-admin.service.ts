import { Injectable } from '@nestjs/common'
import { Email as PrismaEmail } from '@prisma/client'
import { ApiCoreService } from '@pubkey-stack/api/core/data-access'
import { AdminCreateEmailInput } from './dto/admin-create-email.input'
import { AdminFindManyEmailInput } from './dto/admin-find-many-email-input'
import { AdminUpdateEmailInput } from './dto/admin-update-email.input'

@Injectable()
export class ApiEmailAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async createEmail(input: AdminCreateEmailInput): Promise<PrismaEmail> {
    const found = await this.core.data.email.findUnique({ where: { email: input.email } })
    if (found) {
      throw new Error(`Email ${input.email} already exists`)
    }
    const created = await this.core.data.email.create({
      data: {
        email: input.email,
        ownerId: input.ownerId,
      },
    })
    if (!created) {
      throw new Error(`Email ${input.email} not created`)
    }
    return created
  }

  async deleteEmail(emailId: string): Promise<boolean> {
    const found = await this.core.data.email.findUnique({ where: { id: emailId } })
    if (!found) {
      throw new Error(`Email ${emailId} not found`)
    }
    const deleted = await this.core.data.email.delete({ where: { id: emailId } })
    if (!deleted) {
      throw new Error(`Email ${emailId} not deleted`)
    }
    return true
  }

  async findManyEmail(input: AdminFindManyEmailInput): Promise<PrismaEmail[]> {
    const items = await this.core.data.email.findMany({
      where: { ownerId: input.ownerId },
      orderBy: { email: 'asc' },
    })
    if (!items) {
      return []
    }
    return items
  }

  async updateEmail(emailId: string, input: AdminUpdateEmailInput): Promise<PrismaEmail> {
    const found = await this.core.data.email.findUnique({ where: { id: emailId } })
    if (!found) {
      throw new Error(`Email ${emailId} not found`)
    }
    const updated = await this.core.data.email.update({
      where: { id: emailId },
      data: { ...input },
    })
    if (!updated) {
      throw new Error(`Email ${emailId} not updated`)
    }
    return updated
  }
}
