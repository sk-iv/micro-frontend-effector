import { createEffect } from 'effector'
import { status } from 'patronum'
import { createForm } from './createForm'
import { submitForm } from './Form/api/submitForm'

const submitFx = createEffect(submitForm)
export const $requestStatus = status({ effect: submitFx })
export const form = createForm({ submitFx })
