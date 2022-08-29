import React, { useState } from 'react';
import { Button, TextInput, Icon } from '@npm-registry/eapteka-ui';

const FieldTask = ({ addTask }) => {
  const [value, setValue] = useState('')
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleClick = (e) => {
    addTask(e)
    setValue('')
  } 
  return (
    <TextInput
      value={value}
      onChange={handleChange}
      addonAfter={(
        <Button
          size="s"
          value={value}
          theme="transparent"
          onClick={handleClick}
        >
          <Icon name="plus" size="m" />
        </Button>
      )}
    />
  );
};

export default FieldTask
