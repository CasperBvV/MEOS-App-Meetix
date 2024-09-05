const { app, BrowserWindow, ipcMain, WebContentsView } = require('electron');
const path = require('node:path');

const meosPath = 'https://meos.meetix.nl';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
  });

  // Load custom titlebar
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  

  // Load MEOS
  const meos = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload-meos.js'),
    },
  });
  mainWindow.contentView.addChildView(meos);
  meos.webContents.loadURL(meosPath);
  meos.setBounds({ 
    x: 0,
    y: 30,
    width: mainWindow.getBounds().width,
    height: mainWindow.getBounds().height - 30
  });

  // Check for resize
  mainWindow.on('resize', () => {
    meos.setBounds({ 
      x: 0,
      y: 30,
      width: mainWindow.getBounds().width,
      height: mainWindow.getBounds().height - 30
    });
  });

  ipcMain.on('back', () => {
    meos.webContents.navigationHistory.goBack();
  })
  ipcMain.on('fwrd', () => {
    meos.webContents.navigationHistory.goForward();
  })

  ipcMain.on('pageChange', () => {
    var back = meos.webContents.navigationHistory.canGoBack()
    var fwrd = meos.webContents.navigationHistory.canGoForward()
    mainWindow.send('update', back, fwrd)
  })

  mainWindow.on('maximize', () => {
    mainWindow.send('maximize')
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.send('unmaximize')
  });

  mainWindow.on('closed', () => {
    app.quit();
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// Detect buttons
ipcMain.on("asynchronous-message", (event, arg, arg2) => {
  if (arg == 'action') {
    const currentWindow = BrowserWindow.getFocusedWindow()

    if (arg2 == 'min') {
      currentWindow.minimize()
    } else if (arg2 == 'max') {
      currentWindow.maximize()
    } else if (arg2 == 'rest') {
      currentWindow.restore()
    } else if (arg2 == 'close') {
      currentWindow.close()
    }
  }

});

// Open files
ipcMain.on("doc", (event, page, title) => {
  const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
          preload: path.join(__dirname, 'pdf/renderer.js')
      },
      frame: false
  });
  win.loadURL(`file://${__dirname}/pdf/index.html?doc=${page}`)
  win.webContents.once('dom-ready', () => {
      win.title = `Politie Groningen - ${title}`
  })

  win.on('maximize', () => {
      win.send('maximize')
  })
  win.on('unmaximize', () => {
      win.send('unmaximize')
      // win.center()
  })
})