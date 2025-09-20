import { app, BrowserWindow } from 'electron'
import { join } from 'path'

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1000,
    autoHideMenuBar: true, 
    webPreferences: {
      preload: join(__dirname, '../preload/preload.mjs'), // preload output
      nodeIntegration: false,
      contextIsolation: true,
      sandbox:false,
    },
  })

  // electron-vite injects this in dev mode
  const devServerUrl = process.env['ELECTRON_RENDERER_URL'] || process.env['VITE_DEV_SERVER_URL']

  if (devServerUrl) {
    // 👉 load Vite dev server (http://localhost:5173)
    win.loadURL(devServerUrl)
  } else {
    // 👉 production: load the built index.html
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
