const { app, BrowserWindow } = require('electron');
const path = require('path')
const env = process.env.NODE_ENV || 'development';
  
// If development environment
if (env === 'development') {
    try {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    } catch (_) { console.log('Error'); }    
}
const createWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 900,
      titleBarStyle: "hidden",
      titleBarOverlay: true,
      webPreferences: {
        preload: path.join(__dirname, 'test.js')
      }
    })
  
    win.loadFile('./root/index.html')
  }
  app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })