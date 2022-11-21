import React from 'react';
import { FieldText, Icon } from '@npm-registry/eapteka-ui';
import { useGate } from 'effector-react'
import {useField, FieldGate} from '../model3'

const FieldName = () => {
  useGate(FieldGate, {
    // initialValue: 'в',
    name: 'name',
    validate: (value) => value?.length < 2 && 'Должно быть больше 2-х символов',
    requiredMessage: 'Имя обязательно для заполнения',
  })
  const { field, onChange, onBlur } = useField('name');

  const handleChange = (e) => {
    onChange(e.target.value)
  }
  const handleBlur = (e) => {
    onBlur(e.target.value)
    if(!field.isTouched) {
      console.log('GGGGGGGGGGGGGGGGGGGGGGGGGG');
    }
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
    />
  );
}
export default FieldName