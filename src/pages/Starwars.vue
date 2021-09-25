<template>
  <div>
    <p v-if="isFetching" class="text-purple-500">Loading...</p>
    <p v-if="isError" class="text-red-500">Error! {{ error }}</p>
    <ul v-for="person in people" :key="person.name" class="border rounded">
      <li>
        - {{ person.name }}
        <ul>
          <li>hair: {{ person.hair_color }}</li>
          <li>eyes: {{ person.eye_color }}</li>
        </ul>
      </li>
    </ul>
    <InfiniteLoad
      v-if="data"
      @infinite-load="fetchNextPage()"
      :loading="isFetching"
      :has-more="hasNextPage"
    />
  </div>
</template>

<script lang="ts">
import InfiniteLoad from '@/components/InfiniteLoad.vue'
export default defineComponent({
  name: 'StarwarsHome',
  components: { InfiniteLoad },
})
</script>

<script lang="ts" setup>
import { useInfiniteQuery } from 'vue-query'
import axios from 'axios'

const initialUrl = 'https://swapi.dev/api/people/'
const fetchPeople = (url: string) => axios.get(url).then((res) => res.data)

const { data, fetchNextPage, hasNextPage, isFetching, isError, error } =
  useInfiniteQuery(
    'sw-people',
    ({ pageParam = initialUrl }) => fetchPeople(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  )

const people = computed(() => {
  return data.value?.pages.flatMap((a) => a.results)
})
</script>

<style></style>
