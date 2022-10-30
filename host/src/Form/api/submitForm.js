export const submitForm = (props) => new Promise((res, rej) => setTimeout(() => {
  return (
    res(props)
    // rej(new Error('Ошибка загрузки'))
  )
}, 2000))