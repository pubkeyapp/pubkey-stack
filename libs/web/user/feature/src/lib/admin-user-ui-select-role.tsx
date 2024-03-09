import { UserRole } from '@pubkey-stack/sdk'
import { getEnumOptions, UiSelectEnum } from '@pubkey-ui/core'

export function AdminUserUiSelectRole({
  value,
  setValue,
}: {
  value: UserRole | undefined
  setValue: (role: UserRole | undefined) => void
}) {
  return (
    <UiSelectEnum<UserRole>
      value={value}
      setValue={setValue}
      options={[{ value: '', label: 'Filter by role' }, ...getEnumOptions(UserRole)]}
    />
  )
}
