# 计数与统计

![GitHub](https://img.shields.io/github/license/Lifeni/what-to-count)

一个用于计数和统计的桌面程序。

通过条码扫描仪或键盘读入数据后，根据配置文件对数据进行统计和整合。

> 软件仅在 Windows 上测试，理论上 Linux 和 macOS 也能用。

## 开发构建

程序编译需要 Node.js 16 及以上版本和 Yarn 包管理器。

```shell
# 安装依赖
yarn

# 运行开发环境
yarn run dev
```

```shell
# 打包为 Windows 程序
yarn run pack:win

# 打包为 Windows、Linux 和 macOS 的程序
yarn run pack:all
```

打包后的文件在项目根目录的 dist 文件夹下。

> 第一次运行打包程序需要从 GitHub 上下载一些文件，可能需要一些时间。

## 协议相关

本项目以 MIT License 开源。

项目模板来自 https://github.com/jctaoo/vite-electron-esbuild-starter 。
