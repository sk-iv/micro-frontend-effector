import React from 'react';
import { FieldText, Icon } from '@npm-registry/eapteka-ui';
import { useGate } from 'effector-react'
import { useField } from '../createForm'
import { form } from '../model3'

const FieldName = () => {
  useGate(form.FieldGate, {
    // initialValue: 'в',
    name: 'name',
    validate: (value) => value?.length < 2 && 'Должно быть больше 2-х символов',
    requiredMessage: 'Имя обязательно для заполнения',
  })
  const { field, onChange, onBlur, onFocus } = useField('name', form);

  const handleChange = (e) => {
    onChange(e.target.value)
  }
  const handleBlur = (e) => {
    onBlur(e.target.value)
    if(!field.isTouched) {
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGG');
    }
  }

  const handleFocus = (e) => {
    onFocus(e.target.value)
  }

  return (
    <FieldText
      addonAfter={
        field.isValid !== null 
          ? (
            <Icon
              style={{color: field.isValid ? 'green' : 'red'}}
              name={field.isValid ? "checkRound" : 'exclamation'}
            />
          ) 
          : ''
      }
      className="mt-1"
      errorMessage={field?.errorMessage}
      label="Текстовое поле"
      onBlur={handleBlur}
      onChange={handleChange}
      required={true}
      value={field?.value}
      hasClear
      onFocus={handleFocus}
    />
  );
}
export default FieldName