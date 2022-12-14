# micro-frontend-effector
Демонстрация работы микрофронтендов и стэйт мэнеджера effector

## Быстрый старт:
```
npm i
npm start
```
Результат на http://localhost:3000/

---
## Материалы для обучения Effector

- [📚 Структура моделей Effector](https://sova.dev/ru/effector-model-structure/)
- [Небольшой проект на эффекторе для самых маленьких](https://github.com/omgpiu/effector-article/blob/master/README_ru.md)
- [🔗 Примеры использования](https://github.com/effector/awesome#examples)
- [💬 Телеграм канал](https://t.me/effector_ru)
- [▶️ Делаем игру Ball Sort на Effector](https://www.youtube.com/watch?v=tjjxIQd0E8c) 🕑 1h 42m
- [▶️ React and Effector From Beginners to Masters](https://www.youtube.com/watch?v=_m2XfYzBV2c) 🕑 17m

---
- [📚 Статья про тэстирование](https://dev.to/effector/the-best-part-of-effector-4c27)
- [📚 Необычное использование Fork API](https://sova.dev/ru/unusual-use-of-fork-api/)
---
## Соединение юнитов

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
---
## Нормализация данных

[📚 Normalize your complex JS objects](https://dev.to/danielpdev/normalize-your-complex-js-objects-21d9)

Сложность O(n) линейная:

```js
const apiData = [
  {
    id: 1,
    name: "Svetlana Ivannikova",
    login: "sk_iv"
  },
  {
    id: 2,
    name: "John Doe",
    login: "jo_do"
  }
];
```

🢃

Сложность O(1) константная:
```js
{
  "1": {
    "id": 1,
    "name": "Svetlana Ivannikova",
    "login": "sk_iv"
  },
  "2": {
    "id": 2,
    "name": "Other Name",
    "siteUrl": "danielpdev.io"
  }
}
```

## Фабрика
Для дублирующего функционала можно создавать фабрики

[документация](https://effector.dev/docs/api/effector/babel-plugin/#example)

http://localhost:9090/form

Пример фабрики форм: 
1. сохраняет состояние значений
  а) тип значение
  б) тип чекед
2. валидирует  
  a) правила валидации задаются при помощи функции validate
  б) при помощи requiredMessage (для полей обязательных для заполнения)
3. не даёт напечатать запрещённые типы `parse`