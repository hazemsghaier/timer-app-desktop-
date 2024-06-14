import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    show: false,
    frame: false,
    maxHeight:400,
    maxWidth:600,
    transparent: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  });

  mainWindow.setAlwaysOnTop(true);

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  let isOverlay = false;
  const changeOverlayShortcut = 'ctrl+p';

  const shortcutRegistered = globalShortcut.register(changeOverlayShortcut, () => {
    console.log('Shortcut triggered');
    isOverlay = !isOverlay;
    mainWindow.setIgnoreMouseEvents(isOverlay);
    mainWindow.webContents.send('overlay-channel', isOverlay);
  });

  if (!shortcutRegistered) {
    console.log('Global shortcut registration failed');
  } else {
    console.log('Global shortcut registered successfully');
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('close-window', (e, args) => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      currentWindow.close();
    }
  });

  ipcMain.on('minimize-window', (e, args) => {
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
      currentWindow.minimize();
    }
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
