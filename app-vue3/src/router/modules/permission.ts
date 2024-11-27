export default {
  path: "/permission",
  meta: {
    title: "menus.purePermission",
    icon: "ep:lollipop",
    rank: 12
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      component: () => import("@/views/permission/page/index.vue"),
      meta: {
        title: "menus.purePermissionPage"
      }
    },
    {
      path: "/permission/button/permTags",
      component: () => import("@/views/permission/button/permTags.vue"),
      name: "PermissionButtonPermTags",
      meta: {
        tags: ["permTags:test"],
        title: "menus.purePermissionPageTest"
      }
    },
    {
      path: "/permission/button",
      meta: {
        title: "menus.purePermissionButton"
      },
      children: [
        {
          path: "/permission/button/router",
          component: () => import("@/views/permission/button/index.vue"),
          name: "PermissionButtonRouter",
          meta: {
            title: "menus.purePermissionButtonRouter",
            auths: [
              "permission:btn:add",
              "permission:btn:edit",
              "permission:btn:delete"
            ]
          }
        },
        {
          path: "/permission/button/login",
          component: () => import("@/views/permission/button/perms.vue"),
          name: "PermissionButtonLogin",
          meta: {
            title: "menus.purePermissionButtonLogin"
          }
        },
        {
          path: "/permission/button/permTags",
          component: () => import("@/views/permission/button/permTags.vue"),
          name: "PermissionButtonPermTags",
          meta: {
            title: "menus.purePermissionButtonPermTags"
          }
        }
      ]
    }
  ]
};
