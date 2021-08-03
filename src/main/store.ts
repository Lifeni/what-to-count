import { ipcMain } from 'electron'
import Store from 'electron-store'

const store = new Store({
  name: 'mapping-store',
})

ipcMain.handle('store', (e, type, key, value) => {
  switch (type) {
    case 'set': {
      store.set(key, value)
      break
    }
    case 'get': {
      return store.get(key)
    }
    case 'get-all': {
      const arr = []
      if (store.store) {
        for (const [input, name] of Object.entries(store.store)) {
          arr.push({ input, name })
        }
      }
      return arr
    }
    case 'del': {
      store.delete(key)
      break
    }
  }
  return
})
