import React from 'react';
import { List, ListItem, Icon, RadioButton, Typography } from '@npm-registry/eapteka-ui';
import { useGate } from 'effector-react'
import { useField, FieldGate } from '../model3'

const FieldsetPayment = () => {
  useGate(FieldGate, {
    initialChecked: ['one'],
    name: 'payment',
  })
  const { field, onCheck } = useField('payment');

  const handleChange = (e) => {
    onCheck(e.target.value)
  }

  return (
    <List style={{ width: '100%' }} className="mt-1" tag="div" frame="filled">
      <ListItem
        tag="div"
        clickableProps={{ tag: 'label' }}
        addonAfter={
          <RadioButton
            onChange={handleChange}
            checked={field?.checked?.[0] === "one"}
            name="payment"
            value="one" 
          />
        }
        addonBefore={<Icon name={'promocode'} />}
        hasSeparator
      >
        <Typography>Онлайн</Typography>
      </ListItem>
      <ListItem
        tag="div"
        clickableProps={{ tag: 'label' }}
        addonAfter={
          <RadioButton
            onChange={handleChange}
            checked={field?.checked?.[0] === "two"}
            name="payment"
            value="two"
          />
        }
        addonBefore={<Icon name={'promocode'} />}
        hasSeparator
      >
        <Typography>Наличными</Typography>
      </ListItem>
      <ListItem
        tag="div"
        clickableProps={{ tag: 'label' }}
        addonAfter={
          <RadioButton
            onChange={handleChange}
            checked={field?.checked?.[0] === "three"}
            name="payment"
            value="three"
          />
        }
        addonBefore={<Icon name={'promocode'} />}
        hasSeparator
      >
        <Typography>В кредит</Typography>
      </ListItem>
    </List>
  );
}
export default FieldsetPayment