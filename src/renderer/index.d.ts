type ViewType = 'home' | 'count'

export type LogType = {
  time: string
  name: string
}

declare global {
  interface Window {
    electron: {
      setView: (name: ViewType, value?: string) => void
    }
  }
}
