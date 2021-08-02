import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { join } from 'path'
import { pathToFileURL } from 'url'

const isDevelopment = process.env.NODE_ENV === 'development'

let homeWin: BrowserWindow | null = null
let countWin: BrowserWindow | null = null

const createHomeWindow = () => {
  homeWin = new BrowserWindow({
    width: 720,
    height: 540,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, './preload.js'),
    },
    show: false,
    autoHideMenuBar: true,
    resizable: false,
  })
    .once('ready-to-show', () => {
      homeWin?.show()
    })
    .on('closed', () => {
      homeWin = null
    })

  if (isDevelopment) {
    homeWin.loadURL('http://localhost:3000')
    homeWin.webContents.toggleDevTools()
  } else {
    homeWin.loadURL(
      pathToFileURL(join(__dirname, './renderer/index.html')).toString()
    )
  }
}

const createCountWindow = (name: string) => {
  countWin = new BrowserWindow({
    width: 1080,
    height: 720,
    minWidth: 980,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, './preload.js'),
    },
    show: false,
    autoHideMenuBar: true,
  })
    .once('ready-to-show', () => {
      countWin?.show()
    })
    .on('closed', () => {
      countWin = null
    })

  if (isDevelopment) {
    countWin.loadURL(`http://localhost:3000/#${name}`)
    countWin.webContents.toggleDevTools()
  } else {
    countWin.loadFile(`./renderer/index.html`, { hash: name })
  }
}

app.whenReady().then(createHomeWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createHomeWindow()
  }
})

ipcMain.on('view', (e, name, value) => {
  switch (name) {
    case 'home': {
      if (!homeWin) {
        createHomeWindow()
        countWin && countWin.close()
      } else homeWin.focus()
      break
    }
    case 'count': {
      if (!countWin) {
        createCountWindow(value)
        homeWin && homeWin.close()
      } else countWin.focus()
      break
    }
  }
})

ipcMain.on('export', (e, name) => {
  const file = dialog.showSaveDialogSync({
    title: '导出记录为 CSV 文件',
    defaultPath: `${name || '导出的记录文件'}.csv`,
    filters: [{ name: 'CSV', extensions: ['csv'] }],
  })
  e.reply('export-reply', file)
})

ipcMain.on('confirm', (e, message) => {
  const id = dialog.showMessageBoxSync({
    message,
    title: '确认一下',
    type: 'warning',
    buttons: ['取消', '确定'],
  })

  e.reply('confirm-reply', id !== 0)
})
