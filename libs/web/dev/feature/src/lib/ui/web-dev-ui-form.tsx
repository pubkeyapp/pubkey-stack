import { Button, Grid } from '@mantine/core'
import {
  formFieldCheckbox,
  formFieldDate,
  formFieldNumber,
  formFieldPassword,
  formFieldSelect,
  formFieldText,
  formFieldTextarea,
  UiCard,
  UiDebug,
  UiForm,
  UiFormField,
  UiStack,
} from '@pubkey-stack/web-ui-core'
import { useState } from 'react'

interface WebDevComponentsFormDemo {
  name: string
  email: string
  password: string
  age: number
  color: string
  bio: string
  dob: Date
  agree: boolean
}
const initial: WebDevComponentsFormDemo = {
  name: 'John Doe',
  email: 'jdoe@example.com',
  password: 'secret',
  age: 42,
  color: 'red',
  bio: '',
  dob: new Date(),
  agree: false,
}
export function WebDevUiForm() {
  const [model, setModel] = useState<WebDevComponentsFormDemo>(initial)
  const fields: UiFormField<WebDevComponentsFormDemo>[] = [
    formFieldText('name', { label: 'Name', required: true }),
    formFieldText('email', { label: 'Email', required: true }),
    formFieldPassword('password', { label: 'Password', required: true }),
    formFieldNumber('age', { label: 'Age', required: true }),
    formFieldSelect('color', {
      label: 'Color',
      required: true,
      options: ['red', 'blue', 'green'].map((value) => ({ value, label: value })),
    }),
    formFieldDate('dob', { label: 'Date of Birth', required: true }),
    formFieldTextarea('bio', { label: 'Bio', required: true }),
    formFieldCheckbox('agree', { label: 'Agree', required: true }),
  ]
  return (
    <UiCard title="UiForm">
      <UiStack>
        <Grid>
          <Grid.Col md={6}>
            <UiForm
              model={model}
              fields={fields}
              submit={async (input) => {
                setModel(() => input as WebDevComponentsFormDemo)
                return true
              }}
            >
              <Button type="submit">Submit</Button>
            </UiForm>
          </Grid.Col>
          <Grid.Col md={6}>
            <UiDebug data={model} open />
          </Grid.Col>
        </Grid>
      </UiStack>
    </UiCard>
  )
}
