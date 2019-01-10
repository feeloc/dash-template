# vue + nodejs 
Vue.js 2 + vue-router + webpack2 + iView 2 + thinkjs

## 截图
1、每天都会变换的背景，❤情舒适
![ScreenShot](https://raw.github.com/feeloc/dash-template/master/screeshot/6678912C-1571-42C6-99C0-C112F4BF6C0D.png)
2、首页
![ScreenShot](https://raw.github.com/feeloc/dash-template/master/screeshot/6678912C-1571-42C6-99C0-C112F4BF6C1D.png)
![ScreenShot](https://raw.github.com/feeloc/dash-template/master/screeshot/6678912C-1571-42C6-99C0-C112F4BF6C2D.png)

## 前端

使用技术：vue.js \
组件库：iView

```$xslt
cd client
npm i
```

### 开发环境

启动后，项目有修改自动编译

```
cd client
npm run init
npm run dev
```

### 生产环境

将开发环境的代码发现到后端server中，由nodejs作为webserver，也可发布到静态环境目录，由nginx等作为webserver

```$xslt
cd client;
npm run build
```

会将`html`发布到`server/view/`目录下 \
会将`js,css,img`发布到`server/www/`目录下

## 后端

使用技术：nodejs
web框架：thinkjs

```$xslt
cd server
npm i
```

### 开发环境

启动后，项目有修改自动编译

```
cd server
npm start
```

### 生产环境

项目先compile，再使用，可使用pm2作为node进程管理工具，根据自己情况修改`pm2.json`

```
cd server
npm run compile
pm2 start pm2.json
```

## 注意
因为是thinkjs直接管理node进程，所以如果要使用以下命令实现平滑过度

```$xslt
pm2 sendSignal SIGUSR2 pm2.json
```

通过发送 `SIGUSR2` 信号，pm2 会将这个信号派发给框架，框架主进程捕获到这个信号后，会 fork 一个新的子进程提供服务，然后逐渐将之前的子进程重启，从而达到不中断服务重启的目的。

框架会强制使用 cluster，然后使用 master/worker 的方式提供服务，所以就不能开启 `pm2` 中的 cluster 模式（如果开启，那么启动服务会直接报错退出）。
