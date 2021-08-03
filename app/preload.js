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

// src/main/preload.ts
var import_electron = __toModule(require("electron"));
var import_electron_log = __toModule(require("electron-log"));
var import_fs = __toModule(require("fs"));
import_electron.contextBridge.exposeInMainWorld("log", import_electron_log.default.functions);
import_electron.contextBridge.exposeInMainWorld("store", {
  get: async (key) => await import_electron.ipcRenderer.invoke("store", "get", key),
  set: async (key, value) => await import_electron.ipcRenderer.invoke("store", "set", key, value),
  all: async () => await import_electron.ipcRenderer.invoke("store", "get-all"),
  del: async (key) => await import_electron.ipcRenderer.invoke("store", "del", key)
});
import_electron.contextBridge.exposeInMainWorld("electron", {
  setView: (name, value) => import_electron.ipcRenderer.send("view", name, value),
  exportRecord: (logs, stats, name) => {
    import_electron.ipcRenderer.send("export", name);
    import_electron.ipcRenderer.once("export-reply", (e, result, file) => {
      if (result !== 0) {
        switch (result) {
          case 1:
            import_fs.default.writeFileSync(file, "\uFEFF" + logs, "utf8");
            break;
          case 2:
            import_fs.default.writeFileSync(file, "\uFEFF" + stats, "utf8");
            break;
        }
      }
    });
  },
  showConfirm: (message, action) => {
    import_electron.ipcRenderer.send("confirm", message);
    import_electron.ipcRenderer.once("confirm-reply", (e, result) => {
      if (result)
        action();
    });
  }
});
//# sourceMappingURL=preload.js.map
