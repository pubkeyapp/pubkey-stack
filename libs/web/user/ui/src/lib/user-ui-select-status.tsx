import { UserStatus } from '@pubkey-stack/sdk'
import { getEnumOptions, UiSelectEnum } from '@pubkey-ui/core'

export function UserUiSelectStatus({
  value,
  setValue,
}: {
  value: UserStatus | undefined
  setValue: (value: UserStatus | undefined) => void
}) {
  return (
    <UiSelectEnum<UserStatus>
      value={value}
      setValue={setValue}
      placeholder="Filter by status"
      clearable
      options={getEnumOptions(UserStatus)}
    />
  )
}
