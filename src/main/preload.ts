import { contextBridge, ipcRenderer } from 'electron'
import log from 'electron-log'
import fs from 'fs'

contextBridge.exposeInMainWorld('log', log.functions)

contextBridge.exposeInMainWorld('electron', {
  setView: (name: string, value: string) =>
    ipcRenderer.send('view', name, value),
  exportRecord: (logs: string, stats: string, name: string) => {
    ipcRenderer.send('export', name)
    ipcRenderer.once('export-reply', (e, result, file) => {
      if (result !== 0) {
        switch (result) {
          case 1:
            // UTF-8 BOM 防止 Excel 乱码
            fs.writeFileSync(file, '\ufeff' + logs, 'utf8')
            break
          case 2:
            fs.writeFileSync(file, '\ufeff' + stats, 'utf8')
            break
        }
      }
    })
  },
  showConfirm: (message: string, action: () => void) => {
    ipcRenderer.send('confirm', message)
    ipcRenderer.once('confirm-reply', (e, result) => {
      if (result) action()
    })
  },
})
