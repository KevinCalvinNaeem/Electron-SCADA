import { app, BrowserWindow } from "electron";
import { join } from "path";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1e3,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "../preload/preload.mjs"),
      // preload output
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    }
  });
  const devServerUrl = process.env["ELECTRON_RENDERER_URL"] || process.env["VITE_DEV_SERVER_URL"];
  if (devServerUrl) {
    win.loadURL(devServerUrl);
  } else {
    win.loadFile(join(__dirname, "../renderer/index.html"));
  }
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
