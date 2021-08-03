var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/main/index.ts
var import_electron2 = __toModule(require("electron"));
var import_path = __toModule(require("path"));
var import_url = __toModule(require("url"));

// src/main/store.ts
var import_electron = __toModule(require("electron"));
var import_electron_store = __toModule(require("electron-store"));
var store = new import_electron_store.default({
  name: "mapping-store"
});
import_electron.ipcMain.handle("store", (e, type, key, value) => {
  switch (type) {
    case "set": {
      store.set(key, value);
      break;
    }
    case "get": {
      return store.get(key);
    }
    case "get-all": {
      const arr = [];
      if (store.store) {
        for (const [input, name] of Object.entries(store.store)) {
          arr.push({input, name});
        }
      }
      return arr;
    }
    case "del": {
      store.delete(key);
      break;
    }
  }
  return;
});

// src/main/index.ts
var isDevelopment = process.env.NODE_ENV === "development";
var homeWin = null;
var countWin = null;
var mappingWin = null;
var createHomeWindow = () => {
  homeWin = new import_electron2.BrowserWindow({
    width: 720,
    height: 540,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: (0, import_path.join)(__dirname, "./preload.js")
    },
    show: false,
    autoHideMenuBar: true,
    resizable: false
  }).once("ready-to-show", () => {
    homeWin?.show();
  }).on("closed", () => {
    homeWin = null;
  });
  if (isDevelopment) {
    homeWin.loadURL("http://localhost:3000");
    homeWin.webContents.toggleDevTools();
  } else {
    homeWin.loadURL((0, import_url.pathToFileURL)((0, import_path.join)(__dirname, "./renderer/index.html")).toString());
  }
};
var createCountWindow = (name) => {
  countWin = new import_electron2.BrowserWindow({
    width: 1080,
    height: 720,
    minWidth: 1080,
    minHeight: 720,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: (0, import_path.join)(__dirname, "./preload.js")
    },
    show: false,
    autoHideMenuBar: true
  }).once("ready-to-show", () => {
    countWin?.show();
  }).on("closed", () => {
    countWin = null;
  });
  if (isDevelopment) {
    countWin.loadURL(`http://localhost:3000/#${name}`);
    countWin.webContents.toggleDevTools();
  } else {
    countWin.loadFile(`./renderer/index.html`, {hash: name});
  }
};
var createMappingWindow = () => {
  mappingWin = new import_electron2.BrowserWindow({
    width: 720,
    height: 540,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: (0, import_path.join)(__dirname, "./preload.js")
    },
    show: false,
    autoHideMenuBar: true,
    resizable: false
  }).once("ready-to-show", () => {
    mappingWin?.show();
  }).on("closed", () => {
    mappingWin = null;
  });
  if (isDevelopment) {
    mappingWin.loadURL(`http://localhost:3000/#mapping`);
    mappingWin.webContents.toggleDevTools();
  } else {
    mappingWin.loadFile(`./renderer/index.html`, {hash: "mapping"});
  }
};
import_electron2.app.whenReady().then(createHomeWindow);
import_electron2.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    import_electron2.app.quit();
  }
});
import_electron2.app.on("activate", () => {
  if (import_electron2.BrowserWindow.getAllWindows().length === 0) {
    createHomeWindow();
  }
});
import_electron2.ipcMain.on("view", (e, name, value) => {
  switch (name) {
    case "home": {
      if (!homeWin) {
        createHomeWindow();
        countWin && countWin.close();
        mappingWin && mappingWin.close();
      } else
        homeWin.focus();
      break;
    }
    case "count": {
      if (!countWin) {
        createCountWindow(value);
        homeWin && homeWin.close();
        mappingWin && mappingWin.close();
      } else
        countWin.focus();
      break;
    }
    case "mapping": {
      if (!mappingWin) {
        createMappingWindow();
        homeWin && homeWin.close();
        countWin && countWin.close();
      } else
        mappingWin.focus();
      break;
    }
  }
});
import_electron2.ipcMain.on("export", (e, name) => {
  const id = import_electron2.dialog.showMessageBoxSync({
    title: "\u5BFC\u51FA\u4EC0\u4E48",
    message: "\u9009\u62E9\u5BFC\u51FA\u7EDF\u8BA1\u6570\u636E\u8FD8\u662F\u8F93\u5165\u8BB0\u5F55",
    type: "info",
    buttons: ["\u53D6\u6D88", "\u8F93\u5165\u8BB0\u5F55", "\u7EDF\u8BA1\u6570\u636E"]
  });
  if (id !== 0) {
    const file = import_electron2.dialog.showSaveDialogSync({
      title: "\u5BFC\u51FA\u8BB0\u5F55\u4E3A CSV \u6587\u4EF6",
      defaultPath: `\u3010${id === 1 ? "\u8F93\u5165\u8BB0\u5F55" : "\u7EDF\u8BA1\u6570\u636E"}\u3011${name || "\u5BFC\u51FA\u7684\u8BB0\u5F55\u6587\u4EF6"}.csv`,
      filters: [{name: "CSV", extensions: ["csv"]}]
    });
    e.reply("export-reply", id, file);
  }
  e.reply("export-reply", 0);
});
import_electron2.ipcMain.on("confirm", (e, message) => {
  const id = import_electron2.dialog.showMessageBoxSync({
    message,
    title: "\u786E\u8BA4\u4E00\u4E0B",
    type: "warning",
    buttons: ["\u53D6\u6D88", "\u786E\u5B9A"]
  });
  e.reply("confirm-reply", id !== 0);
});
//# sourceMappingURL=index.js.map
