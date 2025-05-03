const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// OS별 아이콘 경로 설정
const getIconPath = () => {
  if (process.platform === 'win32') {
    return path.join(__dirname, 'icons', 'icon.ico');
  } else if (process.platform === 'darwin') {
    return path.join(__dirname, 'icons', 'icon.icns');
  } else {
    return path.join(__dirname, 'icons', 'icon.png');
  }
};

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    icon: getIconPath(),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
    }
  });

  mainWindow.loadFile('index.html');
  Menu.setApplicationMenu(null);

  // 자식 창도 동일한 아이콘 설정
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        fullscreen: true,
        icon: getIconPath(),
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          devTools: false,
        }
      }
    };
  });
});
