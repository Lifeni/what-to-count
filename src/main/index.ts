import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { join } from 'path'
import { pathToFileURL } from 'url'
import './store'

const isDevelopment = process.env.NODE_ENV === 'development'

let homeWin: BrowserWindow | null = null
let countWin: BrowserWindow | null = null
let mappingWin: BrowserWindow | null = null

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
    minWidth: 1080,
    minHeight: 720,
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

const createMappingWindow = () => {
  mappingWin = new BrowserWindow({
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
      mappingWin?.show()
    })
    .on('closed', () => {
      mappingWin = null
    })

  if (isDevelopment) {
    mappingWin.loadURL(`http://localhost:3000/#mapping`)
    mappingWin.webContents.toggleDevTools()
  } else {
    mappingWin.loadFile(`./renderer/index.html`, { hash: 'mapping' })
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
        mappingWin && mappingWin.close()
      } else homeWin.focus()
      break
    }
    case 'count': {
      if (!countWin) {
        createCountWindow(value)
        homeWin && homeWin.close()
        mappingWin && mappingWin.close()
      } else countWin.focus()
      break
    }
    case 'mapping': {
      if (!mappingWin) {
        createMappingWindow()
        homeWin && homeWin.close()
        countWin && countWin.close()
      } else mappingWin.focus()
      break
    }
  }
})

ipcMain.on('export', (e, name) => {
  const id = dialog.showMessageBoxSync({
    title: '????????????',
    message: '??????????????????????????????????????????',
    type: 'info',
    buttons: ['??????', '????????????', '????????????'],
  })

  if (id !== 0) {
    const file = dialog.showSaveDialogSync({
      title: '??????????????? CSV ??????',
      defaultPath: `???${id === 1 ? '????????????' : '????????????'}???${
        name || '?????????????????????'
      }.csv`,
      filters: [{ name: 'CSV', extensions: ['csv'] }],
    })
    e.reply('export-reply', id, file)
  }
  e.reply('export-reply', 0)
})

ipcMain.on('confirm', (e, message) => {
  const id = dialog.showMessageBoxSync({
    message,
    title: '????????????',
    type: 'warning',
    buttons: ['??????', '??????'],
  })

  e.reply('confirm-reply', id !== 0)
})
