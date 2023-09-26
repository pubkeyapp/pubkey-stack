import { Group } from '@mantine/core'
import { LoaderType } from '@mantine/styles/lib/theme/types/MantineTheme'
import { UiCard, UiLoader, UiStack } from '@pubkey-stack/web-ui-core'

export function WebDevUiLoader() {
  const variants: LoaderType[] = ['oval', 'dots', 'bars']
  const sized = ['xs', 'sm', 'md', 'lg', 'xl']
  const colors = ['blue', 'red', 'yellow', 'green', 'gray']
  return (
    <UiCard title="UiLoader">
      <UiStack>
        {variants.map((variant) => (
          <Group key={variant}>
            {sized.map((size, i) => (
              <UiLoader key={size} size={size} color={colors[i]} variant={variant} />
            ))}
          </Group>
        ))}
      </UiStack>
    </UiCard>
  )
}
