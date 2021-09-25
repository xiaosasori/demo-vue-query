<template>
  <div>
    Berries
    <div v-if="isLoading">Loading...</div>
    <div v-if="isFetching">Updating...</div>
    <div v-if="isError">Error {{ error }}</div>

    <div v-if="data" v-for="berry in data.results" :key="berry.name">
      {{ berry }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuery } from 'vue-query'
import api from '@/api/pokeApi'

export default defineComponent({
  name: 'Berries',
  setup() {
    const query = useQuery(
      'berries',
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        return api.get('berry').then((res) => res.data)
      },
      {
        refetchOnWindowFocus: false,
        // staleTime: Infinity,
        // vue-query only use cached value when toggle inactive - active component
        cacheTime: Infinity,
      }
    )

    const { data, isLoading, isError, error, isFetching } = query

    console.log(query)

    return { isLoading, isError, data, error, isFetching }
  },
})
</script>

<style></style>
