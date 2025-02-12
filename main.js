require('electron-reload')(__dirname);
import electron from 'electron';
import path from 'path';
import robot from 'robotjs';
import url from 'url';
const { ipcMain } = require('electron')

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,

    // Caracteristicas visuais da janela
    // autoHideMenuBar: true,
    // titleBarStyle: 'customButtonsOnHover',
    frame: false, // Retira barra superior
    useContentSize: false, // Inibe mostragem de dimensao da janela

    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  //mainWindow.removeMenu();

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

///////////////////////////////////////////////////

exports.mouseMove = () => {
  return new Promise(resolve => {
    // Speed up the mouse.
    robot.setMouseDelay(2);

    const twoPI = Math.PI * 10;
    const screenSize = robot.getScreenSize();
    const height = (screenSize.height / 2) - 10;
    const width = screenSize.width;

    for (let x = 0; x < width; x = x + 5)
    {
      const y = height * Math.sin((twoPI * x) / width) + height;
      robot.moveMouse(x, y);
    }

    return resolve(true);
  })

}

exports.mouseColor = () => {
  try {
    var mouse = robot.getMousePos();
    var hex = robot.getPixelColor(mouse.x, mouse.y);
    return hex;
  } catch (error) {
    return error
  }
}

exports.mouseColorArray = (arrayColors) => {
  try {
    return arrayColors.reduce((a, b) => {
      a.push(robot.getPixelColor(b.x, b.y));
      return a;
    }, []);
  } catch (error) {
    return error
  }
}

exports.execProcess = (process, callback) => {
  const { exec } = require('child_process');
  const callExec = exec(process)

  callExec.stdout.on('data', function(data){
    callback(data)
  })
  callExec.stderr.on('data', function(data){
    callback("<b>ERROR:</b> \n" + data)
  })
}

ipcMain.on('ipcTeste', (event, arrayColors) => {
  try {
    const ret = arrayColors.reduce((a, b) => {
      a.push(robot.getPixelColor(b.x, b.y));
      return a;
    }, []);
    event.reply('ipcTeste-reply', ret)

  } catch (error) {
    event.returnValue = error
  }

})