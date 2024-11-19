import { $t } from "@/plugins/i18n";
import { error } from "@/router/enums";

export default {
  path: "/:pathMatch(.*)*",
  meta: {
    root: true,
    icon: "ri:information-line",
    title: $t("menus.pureFourZeroFour"),
    rank: error
  },
  component: () => import("@/views/error/404.vue")
} satisfies RouteConfigsTable;
