import { ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useCounterIncrement } from '../data-access/use-counter-increment'

export function CounterIncrementButton() {
  const counterIncrement = useCounterIncrement()

  return (
    <ActionIcon
      size="xl"
      variant="light"
      loading={counterIncrement.isPending}
      onClick={() => counterIncrement.mutateAsync()}
    >
      <IconPlus />
    </ActionIcon>
  )
}
