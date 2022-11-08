import React from "react"
import FieldName from './Form/FieldName'
import FieldItn from './Form/FieldItn'
import FieldIntervals from './Form/FieldIntervals'
import ButtonSubmit from './Form/ButtonSubmit'
import FieldsetPayment from './Form/FieldsetPayment'

export const Form = () => {
  return (
    <div className="container-form">
      <FieldName />
      <FieldItn />
      <FieldIntervals />
      <FieldsetPayment />
      <ButtonSubmit />
    </div>
)};
export default Form;