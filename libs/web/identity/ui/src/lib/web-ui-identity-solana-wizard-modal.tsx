import { Button, ButtonProps, Modal } from '@mantine/core'
import { ReactNode } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { WebUiIdentitySolanaWizard } from './web-ui-identity-solana-wizard'

export function WebUiIdentitySolanaWizardModal({
  children,
  sign,
  ...props
}: ButtonProps & {
  children: ReactNode
  sign: (useLedger: boolean) => Promise<boolean>
}) {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <Modal opened={opened} onClose={close} size="xl" zIndex={1} title="Verify your wallet" centered>
        <WebUiIdentitySolanaWizard
          p="lg"
          sign={(useLedger) =>
            sign(useLedger)
              .then(() => close())
              .then(() => true)
          }
        />
      </Modal>
      <Button {...props} onClick={open}>
        {children}
      </Button>
    </>
  )
}
