import { sample, createEffect } from 'effector'
import { createGate, useStoreMap, useUnit, useStore } from "effector-react"
import { status } from 'patronum'
import { createForm } from './createForm'
import { submitForm } from './Form/api/submitForm'

export const FieldGate = createGate()
const submitFx = createEffect(submitForm)
const $requestStatus = status({ effect: submitFx })
export const form = createForm({ submitFx })

export const useField = (name) => {
  return {
    field: useStoreMap({
      store: form.$fields,
      fn: (items) => items[name],
      keys: [name],
    }) || {},
    onChange: form.changeField.prepend((value) => ({
      name,
      value,
    })),
    onCheck: form.changeField.prepend((id) => ({
      name,
      id,
    })),
    onBlur: form.blurField.prepend((value) => ({
      name,
      value,
    })),
  }
}

export const useSubmit = () => {
  return {
    onSubmit: form.submit.prepend((value) => value),
    requestStatus: useUnit($requestStatus),
    validationStatus: useStore(form.$isValid)
  }
}

sample({
  clock: FieldGate.open,
  target: form.addField
})