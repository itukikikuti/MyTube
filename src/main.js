import path from "path"
import url from "url"
import {app, BrowserWindow, Menu} from "electron"

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: { nodeIntegration: true }
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }))

    mainWindow.maximize()

    // if (process.env.NODE_ENV === "development") {
        mainWindow.webContents.openDevTools()
    // }

    Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
