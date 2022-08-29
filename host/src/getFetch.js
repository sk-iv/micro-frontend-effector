const getFetch = () => new Promise((res) => setTimeout(() => (
  res({
    id1: {
      label: '🥑 авокадо',
      done: true,
    },
    id2: {
      label: '🍅 томаты',
      done: false,
    },
    id3: {
      label: '🥕 морковь',
      done: false,
    },
  })
), 2000))
export default getFetch