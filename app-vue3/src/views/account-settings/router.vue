<script setup lang="ts">
import RequireLogin from "@/layout/RequireLogin.vue";
import IndexVue from "./index.vue";
</script>

<template>
  <RequireLogin>
    <IndexVue />
  </RequireLogin>
</template>
