import React from 'react';
import { Button } from '@npm-registry/eapteka-ui'
import { useSubmit } from '../model3'

const ButtonSubmit = () => {
  const { onSubmit, requestStatus } = useSubmit();
  const handleSubmit = (e) => {
    onSubmit(e.target.value)
  }

  return (<Button
    name="submit"
    className="mt-1"
    disabled={requestStatus === 'pending'}
    onClick={handleSubmit}
  >
    Отправить
  </Button>)
}
export default ButtonSubmit