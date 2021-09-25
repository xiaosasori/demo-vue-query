<template>
  <div>
    Pokemon
    <div>
      <input type="text" v-model="term" />
    </div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="isFetching">Updating...</div>
    <div v-if="isError">Error {{ error }}</div>

    <div v-if="data">
      <img :src="data.sprites?.front_default" alt="poke" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from 'vue'
import { useQuery } from 'vue-query'
import api, { search } from '@/api/pokeApi'
import useDebounceRef from '@/composables/useDebounceRef'
import axios from 'axios'

export default defineComponent({
  name: 'Pokemon',
  setup() {
    const term = useDebounceRef('', 500)
    const keyQuery = reactive([''])

    // const query = search(term.value)
    const query = useQuery(
      keyQuery,
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500))
        const source = axios.CancelToken.source()

        let promise = api
          .get(`pokemon/${keyQuery[0]}`, {
            cancelToken: source.token,
          })
          .then((res) => res.data)

        // @ts-ignore
        promise.cancel = () => {
          source.cancel('Cancelled query')
        }

        return promise
      },
      {
        // staleTime: Infinity,
        // vue-query only use cached value when toggle inactive - active component
        cacheTime: Infinity,
        // enabled: false
        // retry: 2,
        // retryDelay: 1000,
        // initialData: existingData,
        // initialStale: true
      }
    )
    watch(term, (val) => {
      keyQuery[0] = val
    })

    const { data, isLoading, isError, error, isFetching } = query

    return { isLoading, isError, data, error, isFetching, term, keyQuery }
  },
})
</script>

<style></style>
