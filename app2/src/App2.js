import React from "react";
import { Switcher } from '@npm-registry/eapteka-ui';
import { useStore } from 'effector-react';
import $isChecked, { toggle } from 'host/model2';

export const App2 = () => {
  const isChecked = useStore($isChecked);
  const handleToggle = () => {
    toggle()
  }
  return <div>
    <label>
      <Switcher checked={isChecked} onChange={handleToggle} />
      <span>Фичатогл {isChecked ? 'включен' : 'выключен'}</span>
    </label>
  </div>;
};
export default App2;
