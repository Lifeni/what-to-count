import { contextBridge, ipcRenderer } from 'electron'
import fs from 'fs'

contextBridge.exposeInMainWorld('electron', {
  setView: (name: string, value: string) =>
    ipcRenderer.send('view', name, value),
  exportRecord: (data: string, name: string) => {
    ipcRenderer.send('export', name)
    ipcRenderer.once('export-reply', (e, file) => {
      if (file) {
        // UTF-8 BOM 防止 Excel 乱码
        fs.writeFileSync(file, '\ufeff' + data, 'utf8')
      }
    })
  },
})
