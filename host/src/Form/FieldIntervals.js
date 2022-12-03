import React, {useCallback} from 'react';
import { Select } from '@npm-registry/eapteka-ui';
import { useGate } from 'effector-react'
import { useField } from '../createForm'
import {emitTimeIntervals} from '../emitTimeIntervals'
import { form } from '../model3'

const options = emitTimeIntervals()
const initialChecked = [options[0].id]

const FieldIntervals = () => {
  useGate(form.FieldGate, {
    name: 'intervals',
  })
  const { field, onChange, onCheck, onBlur } = useField('intervals', form);

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