<template>
  <div class="app-wrapper">
    <component :is="`${layout}-layout`" v-if="layout"></component>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/MainLayout";

export default {
  setup() {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }

  },
  components: {
    AuthLayout,
    MainLayout
  }
}
</script>

<style lang="scss">
.app-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>