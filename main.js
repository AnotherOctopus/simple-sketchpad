const { app, BrowserWindow } = require('electron')
        let win
        function createWindow(){
                win = new BrowserWindow({ width: 1000, height: 3000 })

                win.loadFile('index.html')
        win.on('closed', () => {
                win = null
        })
}
app.on('ready',createWindow)
