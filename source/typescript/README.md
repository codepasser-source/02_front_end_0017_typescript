# TypeScript 笔记 #

----------

## 前言 ##

    https://www.tslang.cn/

## 环境篇 ##

- 安装nodejs

    https://nodejs.org/en/

- 安装TypeScript\Gulp TypeScript插件

    # 卸载
    # 目录: /usr/local/lib/node_modules
    # 命令目录: /usr/local/bin
    sudo npm uninstall -g typescript
    # sudo npm uninstall -g gulp-cli
    sudo npm uninstall -g gulp
    sudo npm uninstall -g gulp-typescript
    sudo npm cache clean
    sudo npm list

    # 安装 
    sudo npm install -g typescript
    sudo npm install -g gulp
    sudo npm uninstall -g gulp-cli
    sudo npm install -g gulp-typescript

    # 选择淘宝npm库: --registry=http://registry.npm.taobao.org/ --disturl=https://npm.taobao.org/dist
    sudo npm install -g typescript --registry=http://registry.npm.taobao.org/ --disturl=https://npm.taobao.org/dist
    sudo npm install -g gulp --registry=http://registry.npm.taobao.org/ --disturl=https://npm.taobao.org/dist
    # sudo npm uninstall -g gulp-cli --registry=http://registry.npm.taobao.org/ --disturl=https://npm.taobao.org/dist
    sudo npm install -g gulp-typescript --registry=http://registry.npm.taobao.org/ --disturl=https://npm.taobao.org/dist

- 创建应用

    mkdir typescript
    cd typescript
    # 初始化git
    touch README.md
    git init
    git add .

    # 应用中安装开发依赖
    sudo npm install typescript --save-dev
    sudo npm install gulp --save-dev
    sudo npm install gulp-typescript --save-dev

    # npm初始化包,生成package.json文件
    npm init
    # 创建 typescrpt 编译参数配置文件
    tsc --init

    {
      "include": [
        "src/script/**/*.ts"
      ],
      "exclude": [
        "node_modules",
        "**/*.spec.ts"
      ]
    }


## 配置篇 ##

- 创建gulpfile.js

    var gulp = require("gulp");
    var ts = require("gulp-typescript");
    var tsProject = ts.createProject("tsconfig.json");
    gulp.task("default", function () {
        return tsProject.src()
            .pipe(tsProject())
            .js.pipe(gulp.dest("dist/script"));
    });

- 创建gulp 启动脚本

    gulp default

- 运行脚本
    node dist/script/main.js


## 进阶篇 ##

- CommonJS
    # 编译命令
    tsc --module commonsjs test.ts

- AMD
    # 编译命令
    tsc --module amd test.ts

>
