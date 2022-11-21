import React from 'react';
import { Button } from '@npm-registry/eapteka-ui'
import { useSubmit } from '../model3'

const ButtonSubmit = () => {
  const { onSubmit, requestStatus, validationStatus } = useSubmit();
  const handleSubmit = (e) => {
    onSubmit(e.target.value)
  }
console.log('validationStatus', validationStatus);
  return (<>
  <Button
    name="submit"
    className="mt-1"
    disabled={requestStatus === 'pending'}
    onClick={handleSubmit}
  >
    Отправить
  </Button>
  {validationStatus === 'invalid' && 'Есть ошибки'}
  </>)
}
export default ButtonSubmit