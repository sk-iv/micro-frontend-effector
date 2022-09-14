import {createStore, createEvent} from 'effector'
import connectLocalStorage from "effector-localstorage";

export const toggle = createEvent('toggle')

const togglerLocalStorage = connectLocalStorage("featureActive")
  .onError((err) => console.log(err))

const $isChecked = createStore(togglerLocalStorage.init(true))
  .on(toggle, state => !state)

$isChecked.watch(togglerLocalStorage)

export default $isChecked