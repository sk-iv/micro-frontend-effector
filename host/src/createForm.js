import { createStore, createEvent, sample } from 'effector'

const fieldProps = {
  initialValue: '',
  isValid: null,
  value: '',
  checked: false,
  /**Нужен для событий аналитики, если надо отправить событие при первом касании */
  isTouched: false,
  label: '',
  name: '',
  // trigger: 'onInit',
  options: [],
  type: 'text',
  errorMessage: '',
  /**
   * Если `true`, поле обязательно к заполнению
   */
  required: false,
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
  // const inited = createEvent();
  // const changed = createEvent();
  // const inputed = createEvent();
  // const touched = createEvent();

  const addField = createEvent();
  const changeField = createEvent();
  const blurField = createEvent();
  const validateFields = createEvent();

  $fields
    .on(addField, (fields, field) => {
      const errorMessage = field.validate(field.initialValue) || ''
      return ({
        ...fields,
        [field.name]: {
          ...fieldProps,
          ...field,
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
          isTouched: true,
          value: fields[diff.name]?.parse(diff.value) || !Boolean(diff.value)
            ? diff.value
            : fields[diff.name].value
        },
      })
    })
    .on(blurField, (fields, diff) => {
      if (fields[diff.name].validateMode === 'onBlur') {
        const errorMessage = fields[diff.name].validate(diff.value) || ''

        return ({
          ...fields,
          [diff.name]: {
            ...fields[diff.name],
            isValid: !Boolean(diff.value) ? null : !Boolean(errorMessage),
            errorMessage: !Boolean(diff.value) ? '' : errorMessage,
          },
        })
      }
    })
    .on(validateFields, (fields) => {
      for (const field of Object.values(fields)) {
        console.log('field', field);
        const errorMessage = field.validate(field.value) || ''
        return ({
          ...fields,
          [field.name]: { ...fields[field.name], isValid: !errorMessage, errorMessage },
        })
      }
    })

  // const $isTouched = createStore({})
  //   .on(touched, (isTouched, name) => ({
  //     ...isTouched,
  //     [name]: true,
  //   }))
  //   .on(changed, (isTouched, [name]) => ({
  //     ...isTouched,
  //     [name]: false,
  //   }))
  //   .on(inputed, (isTouched, [name]) => ({
  //     ...isTouched,
  //     [name]: false,
  //   }))
  //   .reset(reset);

  const $isValid = $fields.map((fields) => {
    return Object.values(fields).every((field) => {
      return field.isValid || field.isValid === null
    })
  });

  // const fieldEntries = Object.entries(
  //   initialValues
  // ).map(([name, initialValue]) => {
  //   const fieldReset = inputed.prepend(
  //     () => [name, initialValue]
  //   );

  //   const fieldInputed = inputed.prepend((value) => [
  //     name,
  //     value,
  //   ]);

    // const fieldChanged = changed.prepend((value) => [
    //   name,
    //   value,
    // ]);

  //   const fieldTouched = touched.prepend(() => name);

  //   const $isFieldTouched = $isTouched.map<boolean | null>(
  //     (isTouched) => isTouched[name] || null
  //   );

  //   const $error = $errors.map(
  //     (errors) => errors[name] || null
  //   );

  //   const $value = $values.map((values) => values[name]);

  //   const field = {
  //     initialValue,
  //     $value,
  //     $error,
  //     $isTouched: $isFieldTouched,
  //     reset: fieldReset,
  //     inputed: fieldInputed,
  //     changed: fieldChanged,
  //     touched: fieldTouched,
  //   };

  //   return [name, field];
  // });

  // const fields = Object.fromEntries(
  //   fieldEntries
  // );

  // sample({
  //   clock: $values,
  //   target: validateFx,
  // });

  // sample({
  //   clock: [inited, reset],
  //   source: $fields,
  //   target: validateFields,
  // });

  sample({
    clock: submit,
    source: $fields,
    filter: $isValid,
    target: submitFx,
  });

  return {
    addField,
    blurField,
    changeField,
    $isValid,
    $fields,
    reset,
    submit,
  };
};

/**
 * Тэст-кейсы:
 * 1. Форма инициализируестя с невалидным значением в поле (синхронная и асинхронная валидация)
 * 2. Запись в локалстораж
 * 3. Добавить селект
 * 4. submit strategy
 * 5. валидация по onChange
 * 6. событие аналитики
 */