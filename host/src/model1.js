import {createStore, combine, createEvent, guard, createEffect} from 'effector-logger'
import { status } from 'patronum';
import getFetch from './getFetch'
import $isChecked from 'host/model2';

// Определения узлов
// ________________

export const init = createEvent('init')
export const addTask = createEvent('addTask')
export const deleteTask = createEvent('deleteTask')
export const setDoneTask = createEvent('setDone')

const fetchFx = createEffect('fetchFx')
fetchFx.use(getFetch)

const $cache = createStore(null, {name: '$cache'})
const $entries = createStore([], {name: '$entries'})
const $requestStatus = status({ effect: fetchFx })
const $error = createStore(null, {name: '$error'})
const $store = combine(
  $entries,
  $cache,
  $requestStatus,
  $error,
)

// Логика
// ________________

$entries
  .on(fetchFx.done, (_, value) => Object.keys(value.result))
  .on(deleteTask, (store, value) => store.filter((item) => item !== value))
  .on(addTask, (store) => ([`id${Object.keys($cache.getState()).length + 1}`, ...store]))

$cache
  .on(fetchFx.done, (_, value) => value.result)
  .on(setDoneTask, (store, name) => {
    return {...store, [name]: {...store[name], done: !store[name].done}}
  })
  .on(addTask, (store, value) => ({[`id${Object.keys(store).length + 1}`]: { label: value, done: false }, ...store}))

$error.on(fetchFx.fail, (_, value) => value.error)

// Связи
// ________________

guard({
  clock: [$isChecked, init],
  filter: () =>  {
    return $isChecked.getState() && $requestStatus.getState() === 'initial'
  },
  target: fetchFx,
})

export default $store
