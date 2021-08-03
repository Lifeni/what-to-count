import log from 'electron-log'
import Store from 'electron-store'

type ViewType = 'home' | 'count' | 'mapping'

export type LogType = {
  time: string
  input: string
}

export type StatType = {
  input: string
  count: number
}

export type MappingType = {
  input: string
  name: string
}

declare global {
  interface Window {
    electron: {
      setView: (name: ViewType, value?: string) => void
      exportRecord: (logs: string, stats: string, name: string) => void
      showConfirm: (message: string, action: () => void) => void
    }
    log: log.LogFunctions
    store: {
      get: (key: string) => MappingType
      set: (key: string, value: any) => void
      all: () => MappingType[]
      del: (key: string) => void
    }
  }
}
