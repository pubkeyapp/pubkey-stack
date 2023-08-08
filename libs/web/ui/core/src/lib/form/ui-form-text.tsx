import { UiFormField, UiFormFieldType } from './ui-form-field'

export type UiFormText<T> = Omit<UiFormField<T>, 'key' | 'options' | 'rows' | 'type'> & {
  error?: unknown
  pattern?: string
}

export function formFieldText<T>(key: keyof T, options: UiFormText<T>): UiFormField<T> {
  return {
    key,
    type: UiFormFieldType.Text,
    ...options,
  }
}
