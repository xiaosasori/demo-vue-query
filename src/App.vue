<template>
  <div>
    <button @click="toggle">Toggle</button>
    <router-view v-if="show" />
    <VueQueryDevTools :initialIsOpen="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQueryProvider } from 'vue-query'
import { VueQueryDevTools } from 'vue-query/devtools'

export default defineComponent({
  name: 'App',
  components: { VueQueryDevTools },
  setup() {
    useQueryProvider({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
    const show = ref(true)
    function toggle() {
      show.value = !show.value
    }
    return { show, toggle }
  },
})
</script>

<style></style>
