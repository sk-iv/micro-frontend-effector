import { createStore, createEvent, sample, split } from 'effector'
import { createGate, useStoreMap, useUnit, useStore } from "effector-react"

const fieldProps = {
  initialValue: '',
  initialChecked: [],
  isValid: null,
  /** Если `true` в списке можно выбрать более одного значения */
  isMultiselectable: false,
  value: '',
  checked: [],
  /** поле получило событие фокуса и разфокуса */
  isTouched: false,
  label: '',
  name: '',
  type: 'text',
  errorMessage: '',
  /**
   * Если `true`, поле обязательно к заполнению
   */
  requiredMessage: '',
  /**
   * Функция колбэк для валидации значения
   * @param {string} value Принимает значение `input`
   * @returns {string} message Отдает сообщение об ошибке
   */
  validate: () => {},
  validateMode: 'onBlur',
  /**
   * Функция колбэк для трансформации значения (например, только цифры)
   * @param {string} value Принимает значение `input`
   * @returns {string} value Отдает трансформированное значение `input`
   */
  parse: null,
}

export const createForm = ({ submitFx }) => {
  const FieldGate = createGate()

  const $fields = createStore({});
  const $isTouchedSubmit = createStore(false);

  const reset = createEvent();
  const submit = createEvent();
  const addField = createEvent();
  const changeField = createEvent();
  const blurField = createEvent();
  const focusField = createEvent();
  const validateFields = createEvent();

  $fields
    .on(addField, (fields, field) => {
      const errorMessage = field?.validate?.(field.initialValue) || ''
      return ({
        ...fields,
        [field.name]: {
          ...fieldProps,
          ...field,
          checked: field.initialChecked,
          value: field.initialValue,
          isValid: !Boolean(field.initialValue) ? null : !Boolean(errorMessage),
          errorMessage: !Boolean(field.initialValue) ? '' : errorMessage,
        },
      })
    })
    .on(changeField, (fields, diff) => {
      return ({
        ...fields,
        [diff.name]: {
          ...fields[diff.name],
          ...(diff.id && {checked: [diff.id]}),
          value: fields[diff.name]?.parse?.(diff.value)
            || !Boolean(fields[diff.name]?.parse)
            || diff.value === ''
            ? diff.value
            : fields[diff.name].value
        },
      })
    })
    .on(blurField, (fields, diff) => {
      if (fields[diff.name]?.validateMode === 'onBlur') {
        const errorMessage = (!Boolean(diff.value) && fields[diff.name].requiredMessage)
          || (Boolean(diff.value) && fields[diff.name].validate(diff.value))
          || ''
        let isValid = !Boolean(errorMessage)
        if (!Boolean(diff.value) && !fields[diff.name].requiredMessage) isValid = null
        return ({
          ...fields,
          [diff.name]: {
            ...fields[diff.name],
            isTouched: true,
            isValid,
            errorMessage: errorMessage,
          },
        })
      }
    })
    .on(focusField, (fields, diff) => {
      return ({
        ...fields,
        [diff.name]: {
          ...fields[diff.name],
          isValid: null,
          errorMessage: '',
        },
      });
    })
    .on(validateFields, (fields) => {
      for (const field of Object.values(fields)) {
        const errorMessage = field.validate(field.value) 
          || (!Boolean(field.value) && field.requiredMessage) || ''

        return ({
          ...fields,
          [field.name]: { ...fields[field.name], isValid: !errorMessage, errorMessage },
        })
      }
    })

  const $isValid = $fields.map((fields) => {
    const a = Object.values(fields).every((field) => {
      return (field.isValid || field.isValid === null) 
        && !(!Boolean(field.value) && Boolean(field.requiredMessage))
    }) ? 'valid' : 'invalid'
    return a
  });

  // связи: один ко многим | один к одному
  sample({
    clock: submit,
    fn: () => true,
    target: $isTouchedSubmit
  })
  // связь: многие ко многим
  split({
    clock: submit,            // Если срабатывает событие или обновляется стор
    source: $fields,          // Взять значения из стора
    match: $isValid,          // Стор или функция, возвр-я ключи 'valid' | 'invalid'  
    cases: {                  // сопоставление ключ-юнит
      valid: submitFx,
      invalid: validateFields
    }
  })
  
  sample({
    clock: FieldGate.open,
    target: addField
  })

  return {
    addField,
    blurField,
    focusField,
    changeField,
    $fields,
    $isValid,
    $isTouchedSubmit,
    reset,
    submit,
    FieldGate,
  };
};

export const useField = (name, form) => {
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
    onFocus: form.focusField.prepend((value) => ({
      name,
      value,
    })),
  }
}

export const useSubmit = (form, $requestStatus) => {
  return {
    onSubmit: form.submit.prepend((value) => value),
    requestStatus: useUnit($requestStatus),
    validationStatus: useStore(form.$isValid),
    isTouched: useStore(form.$isTouchedSubmit),
  }
}

/**
 * 
 * Тэст-кейсы:
 * 1. + Форма инициализируестя с невалидным значением в поле (синхронная и асинхронная валидация)
 * 2. submit strategy
 * 3. Запись в локалстораж
 * 4. событие аналитики, реестр триггеров
 */