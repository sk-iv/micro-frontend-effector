const fetchApi = (initValue) => new Promise((res, rej) => setTimeout(() => {
  return (
    res([
      {
        id: 'id1',
        label: '🥑 авокадо',
        done: true,
      },
      {
        id: 'id2',
        label: '🍅 томаты',
        done: false,
      },
      {
        id: 'id3',
        label: '🥕 морковь',
        done: false,
      },
    ])
    // rej(new Error('Ошибка загрузки'))
  )
}, 2000))
export default fetchApi

export const normalize = (data) => {
  const initial = { cache: {}, entries: [] }
  return data.reduce((acc, cur) => ({
    cache: {...acc.cache, [cur.id]: cur}, entries: [...acc.entries, cur.id]
  }), initial)
}