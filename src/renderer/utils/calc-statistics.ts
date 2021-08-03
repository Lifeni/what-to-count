import { LogType } from '..'

type SortBy = 'count' | 'id'

export const calcStatistics = (logs: LogType[], sort: SortBy = 'count') => {
  const map = new Map<string, number>()
  if (logs) {
    logs.map(log => {
      const count = map.get(log.input)
      if (count !== undefined) {
        map.set(log.input, count + 1)
      } else {
        map.set(log.input, 1)
      }
    })
  }

  if (sort === 'id') {
    return Array.from(map.entries(), ([key, value]) => ({
      input: key,
      count: value,
    })).sort((a, b) => Number(a.input) - Number(b.input))
  }
  return Array.from(map.entries(), ([key, value]) => ({
    input: key,
    count: value,
  })).sort((a, b) => b.count - a.count)
}
