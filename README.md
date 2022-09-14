# micro-frontend-effector
Демонстрация работы микрофронтендов и стэйт мэнеджера effector

## Быстрый старт:
```
npm i
npm start
```
Результат на http://localhost:3000/

- [Примеры использования](https://github.com/effector/awesome#examples)
- [Телеграм канал](https://t.me/effector_ru)
- [Статья про тэстирование](https://dev.to/effector/the-best-part-of-effector-4c27)

---
## Соединение стора с другим стором

Авторы рекомендуют привыкать к сэмплам для апдейта сторов, это гораздо более гибкая форма в плане источников данных и фильтрации

```js
sample({
  clock: $store1,       // Если срабатывает событие или обновляется стор
  source: {             // Взять значения из сторов
    s1: $store1,
    s2: $store2,
  }, 
  filter: ({s1, s2}) => // Нужен ли апдейт на основании значений из source?
  fn: ({s1, s2}) =>     // Редьюсер
  target: $store2,      // Если в filter - `true` запустить юнит
})
```
