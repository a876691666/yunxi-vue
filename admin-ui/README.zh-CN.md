[![license](https://img.shields.io/github/license/anncwb/vue-vben-admin.svg)](LICENSE)

## 提示

该仓库使用vben最新版本v5开发, ~~老版本v2地址(不维护)~~ [前往](https://gitee.com/dapppp/ruoyi-plus-vben)

v5版本采用分仓(包)目录结构, 具体开发路径为: `根目录/apps/web-antd`

目前对应后端版本: **5.2.3/2.2.3**

V1.1.0版本已支持离线图标

## 进度

**工作流相关模块等待后端重构后开发**

基础功能已经开发完毕

👉 [更新日志](https://gitee.com/dapppp/ruoyi-plus-vben5/blob/main/CHANGELOG.md)

## 简介

基于 [vben5 & ant-design-vue](https://github.com/vbenjs/vue-vben-admin) 的 RuoYi-Vue-Plus 前端项目

| 组件/框架      | 版本   |
| :------------- | :----- |
| vben           | 5.4.5  |
| ant-design-vue | 4.2.5  |
| vue            | 3.5.11 |

对应后端项目: **(分布式 5.X 分支 微服务 2.分支)**

分布式 [RuoYi-Vue-Plus](https://gitee.com/dromara/RuoYi-Vue-Plus/tree/5.X/)

微服务 [RuoYi-Cloud-Plus](https://gitee.com/dromara/RuoYi-Cloud-Plus/tree/2.X/)

## 预览

admin 账号: admin admin123

[预览地址点这里](http://vben5.dapdap.top)

## WX Group

演示站 - 微信群菜单

## 文档

[本框架文档 强烈建议阅读](https://dapdap.top/)

[Vben V5 文档地址](https://doc.vben.pro/)

[RuoYi-Plus 文档地址](https://plus-doc.dromara.org/#/)

## 预览图

![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/1.png) ![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/2.png) ![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/3.png) ![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/4.png) ![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/5.png) ![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/6.png) ![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/7.png) ![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/8.png) ![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/9.png) ![图片](https://gitee.com/dapppp/ruoyi-plus-vben5/raw/main/scripts/preview/10.png)

## 安装使用

前置准备环境(只能用pnpm)

```json
"packageManager": "pnpm",
"engines": {
  "node": ">=20.15.0",
  "pnpm": "latest"
},
```

- 获取项目代码

```bash
git clone https://gitee.com/dapppp/ruoyi-plus-vben5.git
```

- 安装依赖

```bash
cd ruoyi-plus-vben5

pnpm install
```

- 菜单图标替换

参考 [菜单图标替换](https://dapdap.top/guide/quick-start.html#%E8%8F%9C%E5%8D%95%E5%9B%BE%E6%A0%87%E5%AF%BC%E5%85%A5)

- 关于代码生成

V5版本代码生成模板为付费功能 [详见](https://dapdap.top/other/template.html)

- 关于一些监控的地址配置(微服务版本可以跳过这一小节)

使用[RuoYi-Vue-Plus](https://gitee.com/dromara/RuoYi-Vue-Plus/tree/5.X/)注意 `已经去除 admin/snailjob 的.env 配置` 可自行修改 有两种方式

1. 修改源码`/views/monitor/admin` `views/monitor/snailjob`

```html
<!-- 修改地址 -->
<template>
  <iframe
    class="size-full"
    src="http://localhost:9090/admin/applications"
  ></iframe>
</template>
```

2. **推荐** 使用菜单自行配置 (跟 cloud 版本打开方式一致)

![图片](https://gitee.com/dapppp/ruoyi-plus-vben/raw/main/preview/菜单修改.png)

使用内嵌 iframe 方式需要解决跨域问题 可参考[nginx.conf](https://gitee.com/dromara/RuoYi-Vue-Plus/blob/5.X/script/docker/nginx/conf/nginx.conf#LC87)配置

- 修改.env.development 配置文件
- **注意 RSA 公私钥一定要修改和后端匹配**
- RSA 公私钥为两对 `前端请求加密-后端解密是一对` `后端响应加密 前端解密是一对`

```properties
# 端口号
VITE_PORT=5666
# 打包路径
VITE_BASE=/
# 是否开启 Nitro Mock服务，true 为开启，false 为关闭
VITE_NITRO_MOCK=false
# 是否打开 devtools，true 为打开，false 为关闭
VITE_DEVTOOLS=false
# 是否注入全局loading
VITE_INJECT_APP_LOADING=true

# 后台请求路径 具体在vite.config.mts配置代理
VITE_GLOB_API_URL=/api
# 全局加密开关(即开启了加解密功能才会生效 不是全部接口加密 需要和后端对应)
VITE_GLOB_ENABLE_ENCRYPT=true
# RSA公钥 请求加密使用 注意这两个是两对RSA公私钥 请求加密-后端解密是一对 响应解密-后端加密是一对
VITE_GLOB_RSA_PUBLIC_KEY=
# RSA私钥 响应解密使用 注意这两个是两对RSA公私钥 请求加密-后端解密是一对 响应解密-后端加密是一对
VITE_GLOB_RSA_PRIVATE_KEY=
# 客户端id
VITE_GLOB_APP_CLIENT_ID=e5cd7e4891bf95d1d19206ce24a7b32e
# 开启WEBSOCKET
VITE_GLOB_WEBSOCKET_ENABLE=false
```

- 运行

```bash
pnpm dev:antd
```

- 打包

```bash
pnpm build:antd
```

## 这是一个特性 而不是一个bug!

1. 菜单管理可分配 但只有`admin`/`superadmin`角色能访问 其他角色访问会到403页面
2. 租户相关菜单可分配 但只有`superadmin`角色能访问 其他角色访问会到403页面
3. 分配的租户管理员无法修改自己的角色的菜单(即管理员角色的菜单) 防止自己把自己权限弄没了

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 浏览器支持

最低适配应该为`Chrome 88+`以上浏览器 详见 [css - where](https://developer.mozilla.org/en-US/docs/Web/CSS/:where#browser_compatibility)

本地开发推荐使用`Chrome` 最新版本浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 捐赠

如果项目帮助到您 可以考虑请作者喝杯咖啡 万分感谢您对开源的支持!

<img src=https://plus.dapdap.top/minio-server/plus/2024/03/16/98a9d704eb0c4c04b721bf7799217571.jpg height=360px />
