const HOUR_IN_MS = 1000 * 60 * 60

const startOfHour = date => new Date(Math.floor(date / HOUR_IN_MS) * HOUR_IN_MS)
const getYear = date => date.getFullYear()
const getMonth = date => date.getMonth()
const getDate = date => date.getDate()
const addHours = (date, h) => {
  date.setHours(date.getHours() + h)
  return date
}
const subHours = (date, h) => {
  date.setHours(date.getHours() - h)
  return date
}
const differenceInHours = (dateA, dateB) =>
  Math.trunc((dateA - dateB) / HOUR_IN_MS)
  const options = { weekday: 'short', hour: 'numeric', minute: 'numeric' };

export const TimeCallEnum = { within10Minutes: 0, today: 1, tomorrow: 2, other: 3 }
/**
 * Generates time intervals depending on the day
 * @param timeCall {TimeCallEnum}
 * @param hasOnlyFrom {bool}
 * @returns {[{label: string, value: string}]}
 */

export const emitTimeIntervals = (timeCall = TimeCallEnum.other, hasOnlyFrom = true) => {
  if (!timeCall) {
    return []
  }
  // Получаем текущую временную метку (местное время)
  const dateNow = new Date()
  // Получаем начало часа (14:43 => 14:00) для местной даты
  const cleanDateNow = startOfHour(dateNow)
  const yearNow = getYear(dateNow)
  const monthNow = getMonth(dateNow)
  const dayNow = getDate(dateNow)
  // Создаем дату согласно времени начала работы по Москве
  const startWork = new Date(yearNow, monthNow, dayNow, 8, 0)
  // Получаем количество часов, которые прошли с начала рабочего дня
  const diffMoscow = differenceInHours(dateNow, startWork)
  /*
  Берем местную дату/время, и отнимаем
  количество часов, которые прошли с начала рабочего дня, для того чтобы получить
  начало рабочего дня по местному времени
   */
  const localStartWork = subHours(cleanDateNow, diffMoscow)
  const start = {
    [TimeCallEnum.today]: { start: 1, diff: diffMoscow, date: cleanDateNow },
    [TimeCallEnum.tomorrow]: { start: 0, diff: 0, date: localStartWork },
    [TimeCallEnum.other]: { start: 0, diff: 0, date: localStartWork },
  }
  let intervalsEmit = []

  for (let i = start[timeCall].start; i <= (16 - start[timeCall].diff); i++) {
    intervalsEmit.push(addHours(new Date(start[timeCall].date.toString()), i))
  }

  const intervals = intervalsEmit.map((date) => {
    const fromTime = date
    const interval = hasOnlyFrom
      ? fromTime
      : `${fromTime}-${date}`
    const dateMoscow = date
    const fromTimeMoscow = dateMoscow
    const intervalMoscow = hasOnlyFrom
      ? fromTimeMoscow.toLocaleDateString('ru-RU', options)
      : `${fromTimeMoscow.toLocaleDateString('ru-RU', options)}-${dateMoscow.toLocaleDateString('ru-RU', options)}`
    return {
      option: intervalMoscow,
      id: interval,
    }
  })
  return [
    {
      option: 'В любое время',
      id: 'В любое время',
    },
    ...intervals
  ]
}