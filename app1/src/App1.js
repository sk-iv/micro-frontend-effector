import React from "react";
import { Button, Icon, List, ListItem, Checkbox } from '@npm-registry/eapteka-ui';
import { useStore, useGate } from 'effector-react';
import $store, { deleteTask, addTask, setDoneTask, TaskGate } from 'host/model1';
import $isChecked from 'host/model2';
import FieldTask from './FieldTask'
import { configureRootTheme, externalTheme } from '@npm-registry/eapteka-ui';
import './index.css'

configureRootTheme({ theme: externalTheme });

export const App1 = () => {
  useGate(TaskGate, decodeURI(window.location.search))

  const isChecked = useStore($isChecked);
  const [entries, cache, status, error] = useStore($store);

  const handleAddTask = (e) => {
    addTask(e.target.value)
  }
  const handleSetDoneTask = (e) => {
    setDoneTask(e.target.name)
  }
  const handleDeleteTask = (e) => {
    deleteTask(e.target.value)
  }

  if (status === 'pending') return '... ждёмс 2 сек'

  if (!isChecked) return '🙈 Фича недоступна'

  if (status === 'fail') return `❌ ${error.message}`

  if (entries.length === 0) return null

  return (
    <div className="width-md">
      <FieldTask addTask={handleAddTask} />
      <List>
        {entries.map((id)=> {
          return (
          <ListItem
            key={id}
            style={{textDecoration: cache[id].done ? 'line-through' : 'none'}}
            clickableProps={{ tag: 'label' }}
            addonAfter={<>
              <Checkbox
                name={id}
                onChange={handleSetDoneTask}
                checked={cache[id].done}
              />
              <Button
                size="s"
                value={id}
                theme="transparent"
                onClick={handleDeleteTask}
              >
                <Icon name="minus" size="m" />
              </Button>
            </>}
          >
            {cache[id].label}
          </ListItem>
          )
        })}
      </List>
    </div>
  );
};
export default App1;
