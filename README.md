<p align="center">
  <a href="https://github.com/a876691666/yunxi-vue">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://docs.nestjs.com/assets/logo-small-gradient.svg">
      <img src="https://docs.nestjs.com/assets/logo-small-gradient.svg" height="128">
    </picture>
    <h1 align="center">yunxi-vue</h1>
  </a>
</p>

<div align="center">

目标是打造一套企业级的前后端分离的开发框架，提供一套完整的解决方案，包括后端、前端、运维、监控等，让开发者更专注于业务开发。

![GitHub issues](https://img.shields.io/github/issues/a876691666/yunxi-vue)
![GitHub pull requests](https://img.shields.io/github/issues-pr/a876691666/yunxi-vue)

</div>

## 说明

后端:

- server: fork 自 [taozhi1010/nest-admin](https://github.com/taozhi1010/nest-admin) 进行二次开发。

前端:

- 后台管理: 完全使用 [RuoYi-Vben](https://gitee.com/dapppp/RuoYi-Vben.git)，代码生成模块完美适配
- PC 用户端: 魔改自 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)

## 使用

### 安装

```shell
$ git clone https://github.com/a876691666/yunxi-vue.git
$ cd yunxi-vue

# server
$ cd server
$ pnpm i
$ pnpm start:dev
```

## 开发计划

- `加强 💪`
- `施工中 🔧`

### 原若依功能

- [x] 用户管理
- [x] 角色管理
- [x] 部门管理
- [x] 岗位管理
- [x] 菜单管理
- [x] 字典管理
- [x] 参数管理
- [x] 通知公告
- [x] 操作日志 💪
- [x] 登录日志
- [x] 在线用户
- [ ] 定时任务
- [x] 代码生成 💪
- [x] 系统接口
- [ ] 服务监控
- [x] 缓存监控
- [x] 文件上传
- [ ] 在线构建器
- [ ] 连接池监视

### 新增功能

- [ ] 后台管理扩展
  - [ ] 日志管理 🔧: 独立提供给业务端的日志管理
  - [ ] 文件上传 🔧: 独立提供给业务端的文件上传
    - [ ] 提供`S3 API` 和 `OSS API`
    - [ ] 接入外部自动化备份
  - [ ] 业务管理: 配置业务模块
  - [ ] 通告管理: 向业务用户推送banner、公告、通知、定点广告。
  - [ ] Baas: 根据标签向指定用户提供Baas能力
    - [ ] 分组授权、标签授权
    - [ ] 数据表 `CRUD API`
    - [ ] 自定义函数任务
  - [ ] Faas
    - [ ] 分组授权、标签授权
    - [ ] 动态云函数
    - [ ] 流编排

- [ ] 业务端
  - [ ] 用户基础能力
    - [ ] 用户管理 🔧: 用户信息、多方案登录、用户权限
    - [ ] 用户标签 🔧: 单个用户基于标签的业务权限方案
    - [ ] 用户分组 🔧: 多个用户基于分组的业务权限方案
    - [ ] 用户货币 🔧: 积分、余额、自定义货币
  - [ ] 群组通讯
  - [ ] BI报表
  - [ ] CMS
  - [ ] 工单


## Contributing

欢迎任何形式的贡献，以下是一些您可以为本项目做出贡献的示例：

- 在您的日常工作中使用本项目。
- 提`issues`来报告错误或提出问题。
- 提出拉取请求以改进我们的代码。