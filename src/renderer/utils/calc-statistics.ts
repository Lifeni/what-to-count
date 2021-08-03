import { LogType } from '..'

type SortBy = 'count' | 'id'

export const calcStatistics = (logs: LogType[], sort: SortBy = 'count') => {
  const map = new Map<string, number>()
  if (logs) {
    logs.map(log => {
      const count = map.get(log.name)
      if (count !== undefined) {
        map.set(log.name, count + 1)
      } else {
        map.set(log.name, 1)
      }
    })
  }

  if (sort === 'id') {
    return Array.from(map.entries(), ([key, value]) => ({
      name: key,
      count: value,
    })).sort((a, b) => Number(a.name) - Number(b.name))
  }
  return Array.from(map.entries(), ([key, value]) => ({
    name: key,
    count: value,
  })).sort((a, b) => b.count - a.count)
}
