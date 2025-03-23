const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Permite usar require() no frontend
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();
});
