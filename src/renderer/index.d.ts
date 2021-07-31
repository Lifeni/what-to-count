export {}

type ViewType = 'home' | 'count'

declare global {
  interface Window {
    electron: {
      setView: (name: ViewType, value?: string) => void
    }
  }
}
