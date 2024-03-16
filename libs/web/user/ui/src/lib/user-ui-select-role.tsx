import { UserRole } from '@pubkey-stack/sdk'
import { getEnumOptions, UiSelectEnum } from '@pubkey-ui/core'

export function UserUiSelectRole({
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
      placeholder="Filter by role"
      clearable
      options={getEnumOptions(UserRole)}
    />
  )
}
