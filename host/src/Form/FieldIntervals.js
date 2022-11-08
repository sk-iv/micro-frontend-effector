import React, {useCallback} from 'react';
import { Select } from '@npm-registry/eapteka-ui';
import { useGate } from 'effector-react'
import {useField, FieldGate} from '../model3'
const initialChecked = ['two']
const FieldIntervals = () => {
  useGate(FieldGate, {
    name: 'intervals',
  })
  const { field, onChange, onBlur } = useField('intervals');

  const handleChange = useCallback((e) => {
    console.log('e.target.value', e.target.value);
    //if(e.target.value) onChange(e.target.value)
  },[])
  const handleBlur = (e) => {
    onBlur(e.target.value)
  }
  const handleCheck = (e) => {
    console.log('FieldIntervals handleCheck', e);
    // onChange(e.target)
  }
console.log('field?.value1', field?.value);
  return (
    <Select
      //checkedOptions={initialChecked}
      value={field?.value}
      className="mt-1"
      label="Интервалы доставки"
      onBlur={handleBlur}
      onChange={handleChange}
      onCheck={handleCheck}
      options={[
        { option: 'Один', id: '1' },
        { option: 'Длинный текст в пункте', id: 'two' },
        { option: 'Три', id: 'tree', disabled: true },
        { option: 'Четыре', id: '4' },
        { option: 'Пять', id: '5' },
        { option: 'Шесть', id: '6' },
        { option: 'Семь', id: '7' },
        { option: 'Восемь', id: '8' },
        { option: 'Девять', id: '9' }
      ]}
    />
  )
}
export default FieldIntervals