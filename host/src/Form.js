import React from "react"
import FieldName from './Form/FieldName'
import FieldItn from './Form/FieldItn'
import ButtonSubmit from './Form/ButtonSubmit'

export const Form = () => {
  return (
    <div className="container-form">
      <FieldName />
      <FieldItn />
      <ButtonSubmit />
    </div>
)};
export default Form;