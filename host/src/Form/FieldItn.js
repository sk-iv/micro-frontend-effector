import React from 'react';
import { FieldText, Icon } from '@npm-registry/eapteka-ui';
import { useGate } from 'effector-react'
import {useField, FieldGate} from '../model3'

const FieldItn = () => {
  useGate(FieldGate, {
    initialValue: '',
    name: 'itn',
    parse: (value) => /^\d+$/.test(value),
    validate: (value) => value.length < 10 && 'Должно быть больше 10-х символов'
  })
  const { field, onChange, onBlur } = useField('itn');

  const handleChange = (e) => {
    onChange(e.target.value)
  }
  const handleBlur = (e) => {
    onBlur(e.target.value)
  }

  return (
    <FieldText
      value={field?.value}
      className="mt-1"
      label="ИНН"
      onBlur={handleBlur}
      onChange={handleChange}
      errorMessage={field?.errorMessage}
      addonAfter={
        field.isValid !== null ? (<Icon name={field.isValid ? "checkRound" : 'close'} />) : ''
      }
    />
  )
}
export default FieldItn