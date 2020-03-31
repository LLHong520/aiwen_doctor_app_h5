# 项目名称 ```aiwen_doctor_app_h5```
  中文名称：**爱问医生诊室App内嵌H5**

# 项目说明
  此项目用来放**爱问医生诊室App内嵌H5**页面
  当前只有（医生App4.0报表功能）

# 项目对接人
  医生端App4.0 负责人（郭威龙）
  医生端后端 负责人（刘斌华）

## 仓库地址

```
https://git.dev.wenwo.com/muxinxian/aiwen_doctor_app_h5.git
```

## app传递的参数

```
?docId=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzE3NTQ5OTc4MjMsInBheWxvYWQiOiJcIjE1MTEyMzA4MjUwXCIifQ.r2IwgOg0VmPsM5OHjrvrnJMXvPicnO8uWar1pSZ0RwU&isApp=1&clientType=app&versioncode=410&source=ios&appChannel=wenwo
```

## 技术相关

>主要技术栈

  ```
  vue@2.3.3
  vue-router@2.6.0
  vuex@2.3.1
  axios@0.16.2
  webpack@3.10.0
  ```
> 版本控制

```
 git + git-flow
```

## 项目启动

> 安装依赖 (install dependencies)
```
npm install cnpm -g
cnpm install
```

> 开启本地带有热重载的开发服务器，端口为8889

```
npm run dev
```
## 本地接口模拟器(模拟器相关代码在 mock 目录下)
> 开启本地接口模拟器
```
npm run mock
```
> 停止本地接口模拟器
```
npm run mock:stop
```

## 打包版本
>打包上线版本

```./src/config/index.js``` 中
```
const env = "production";
```
终端中运行
```
npm run build
```
>打包测试版本

```./src/config/index.js``` 中
```
const env = "test";
```
终端中运行
```
npm run build:test
```

**说明** 打包后文件在 ```dist```目录，此目录上测试服务及线上服务均需要前端将打包后的文件交付后端负责人（刘斌华），并由他进行发版操作

## 查看打包报告
```
npm run build --report
```
## 项目说明

```
路由短连接解释
heal => health 健康-科普

状态解释
组件中前缀【VX_】的表示此状态保存在 vuex
```
## 项目文件夹说明

```
1.build==>webpack配置（构建脚本目录）
2.config==>构建配置目录
3.dist==>打包后的文件目录
4.mock==>模拟数据接口目录
5.node_modules==>依赖的node工具包目录
6.src==>源码目录
    assets==>资源目录
    base==>基础组件目录
    common==>公共(封装)js目录
    components==>业务组件目录
    config==>开发模式配置目录
    mixins==>vue 的混入方法mixins
    modules==>vue单个模块目录
    request==>axios 接口请求封装
    router==>总路由配置汇集
    services==>项目接口调用
    store==>vuex状态集中管理
    App.vue==>单页面应用根组件
    main.js==>应用入口js文件
7. static==>静态文件目录
8. .babelrc==>babel配置文件(es6,7转化与支持)
9. .editorconfig==>编辑器编辑规则配置
10.  .eslintrc.js==>ES代码语法检查配置
11.  .gitignore==>git上传忽略文件
12.  .postcssrc.js==>post-css后缀转化配置
13.  index.html==>入口页面
14.  package.json==>项目描述文件

```
## 项目代码规范

* 1 缩进使用空格替换 tab
* 2 缩进使用2个空格
* 3 语句结束必须使用";"结尾
* 4 字符串定义必须用双引号
* 5 路由定义为小写
```
path: '/web_spa/:spaid'
```
* 6 代码中组件或变量定义了，但是未使用需要删除
* 7 页面或组件内要写明组件的用处和使用方法
* 8 上线代码中不能有 console.log()之类的调试信息

## git 基本命令

> 拉取远程仓库到本地
```
git clone https://git.dev.wenwo.com/muxinxian/aiwen_doctor_app_h5.git
```
> 初始化本地仓库分支结构
```
git flow init
```
> 查看文件状态
```
git status
```
> 暂存文件
```
git add file
```
> 暂存当前所有
```
git add -A
```
> 提交暂存的文件
```
git commit -m"v2.5我是本次提交的注释"
```
> 推送本地更改到远程
```
git push origin/master
```
> 打标签
```
git tag v2.5
```

> 标签推送到远程
```
git push origin --tags
```

## 上线日志
* 1 2019.01.23 医生App4.0报表功能支撑
