import {createStore, combine, createEvent, sample, createEffect} from 'effector'
import { createGate } from "effector-react"
import { status } from 'patronum';
import fetchApi, { normalize } from './getFetch'
import $isChecked from 'host/model2';

// Определения узлов
// ________________

export const TaskGate = createGate()

export const init = createEvent()
export const addTask = createEvent()
export const deleteTask = createEvent()
export const setDoneTask = createEvent()

const fetchFx = createEffect()
fetchFx.use(fetchApi)

const $cache = createStore(null)
const $entries = createStore([])
const $requestStatus = status({ effect: fetchFx })
const $error = createStore(null)
const $store = combine(
  $entries,
  $cache,
  $requestStatus,
  $error,
)

// Логика
// ________________

$entries
  .on(fetchFx.done, (_, value) => normalize(value.result).entries)
  .on(deleteTask, (store, value) => store.filter((item) => item !== value))
  // .on(addTask, (store) => ([`id${Object.keys($cache.getState()).length + 1}`, ...store]))

$cache
  .on(fetchFx.done, (_, value) => normalize(value.result).cache)
  .on(setDoneTask, (store, name) => {
    return {...store, [name]: {...store[name], done: !store[name].done}}
  })
  .on(addTask, (store, value) => ({[`id${Object.keys(store).length + 1}`]: { label: value, done: false }, ...store}))

$error.on(fetchFx.fail, (_, value) => value.error)

// Связи
// ________________

sample({
  clock: TaskGate.open,
  target: init
})

/**
 * 1. Если срабатывает событие или обновляется стор
 * 2. Взять значения из сторов
 * 3. Проверить значения на соответствие нужным условиям
 * 4. Если в шаге 3 - `true` запустить юнит
*/

sample({
  clock: [$isChecked, init],                 /*1*/
  source: {                                  /*2*/
    isChecked: $isChecked,
    requestStatus: $requestStatus
  },
  filter: ({isChecked, requestStatus}) =>  { /*3*/
    return isChecked && requestStatus === 'initial'
  },
  fn: (_, initValue) => initValue,
  target: fetchFx,                           /*4*/
})

sample({
  clock: addTask,
  source: {
    entries: $entries,
    cache: $cache
  },
  fn: ({ entries, cache }) => {
    return ([`id${Object.keys(cache).length + 1}`, ...entries])
  },
  target: $entries,
})

export default $store
