import React from 'react';
import { TextInput, FieldText, Icon } from '@npm-registry/eapteka-ui';
import { useGate } from 'effector-react'
import {useField, FieldGate} from '../model3'

const FieldName = () => {
  useGate(FieldGate, {
    initialValue: 'в',
    name: 'name',
    validate: (value) => value.length < 2 && 'Должно быть больше 2-х символов',
    required: true,
    requiredMessage: 'Имя обязательно для заполнения',
  })
  const { field, onChange, onBlur } = useField('name');

  const handleChange = (e) => {
    onChange(e.target.value)
  }
  const handleBlur = (e) => {
    onBlur(e.target.value)
  }

  return (
    <FieldText
      addonAfter={
        field.isValid !== null ? (<Icon name={field.isValid ? "checkRound" : 'close'} />) : ''
      }
      className="mt-1"
      errorMessage={field?.errorMessage}
      label="Текстовое поле"
      onBlur={handleBlur}
      onChange={handleChange}
      required={field?.required}
      value={field?.value}
    />
  );
}
export default FieldName