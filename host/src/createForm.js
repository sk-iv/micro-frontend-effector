import { createStore, createEvent, sample, split } from 'effector'

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
  // trigger: 'onInit',
  // options: [],
  type: 'text',
  errorMessage: '',
  /**
   * Если `true`, поле обязательно к заполнению
   */
  // required: false,
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
  //переименовать в controls
  const $fields = createStore({});

  const reset = createEvent();
  const submit = createEvent();
  const addField = createEvent();
  const changeField = createEvent();
  const blurField = createEvent();
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
          checked: [diff.id],
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

  split({
    clock: submit,
    source: $fields,
    match: $isValid,
    cases: {
      valid: submitFx,
      invalid: validateFields
    }
  })

  return {
    addField,
    blurField,
    changeField,
    $fields,
    $isValid,
    reset,
    submit,
  };
};

/**
 * Тэст-кейсы:
 * 1. + Форма инициализируестя с невалидным значением в поле (синхронная и асинхронная валидация)
 * 2. submit strategy
 * 3. Запись в локалстораж
 * 4. Ошибка в селекте: при инициализации срабатывают холостые Change Сheck
 * 5. валидация по onChange
 * 6. событие аналитики, реестр триггеров
 */