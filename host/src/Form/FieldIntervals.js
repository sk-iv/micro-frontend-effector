import React, {useCallback} from 'react';
import { Select } from '@npm-registry/eapteka-ui';
import { useGate } from 'effector-react'
import {useField, FieldGate} from '../model3'
import {emitTimeIntervals} from '../emitTimeIntervals'

const options = emitTimeIntervals()
const initialChecked = [options[0].id]

const FieldIntervals = () => {
  useGate(FieldGate, {
    name: 'intervals',
  })
  const { field, onChange, onCheck, onBlur } = useField('intervals');

  const handleChange = useCallback((e) => {
    onChange(e.target.value)
  },[])
  const handleBlur = (e) => {
    onBlur(e.target.value)
  }
  const handleCheck = useCallback((key, value, event) => {
    onCheck(key)
    onChange(value?.label)
  },[])

  return (
    <Select
      checkedOptions={initialChecked}
      value={field?.value}
      className="mt-1"
      label="Интервалы доставки"
      onBlur={handleBlur}
      onChange={handleChange}
      onCheck={handleCheck}
      options={options}
      disableFilter
    />
  )
}
export default FieldIntervals