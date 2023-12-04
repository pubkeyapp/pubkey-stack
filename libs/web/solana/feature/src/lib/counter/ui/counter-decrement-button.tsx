import { ActionIcon } from '@mantine/core'
import { IconMinus } from '@tabler/icons-react'
import { useCounterDecrement } from '../data-access/use-counter-decrement'

export function CounterDecrementButton() {
  const counterDecrement = useCounterDecrement()

  return (
    <ActionIcon
      size="xl"
      variant="light"
      loading={counterDecrement.isPending}
      onClick={() => counterDecrement.mutateAsync()}
    >
      <IconMinus />
    </ActionIcon>
  )
}
