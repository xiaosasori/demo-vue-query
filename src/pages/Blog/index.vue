<template>
  <div>
    <h1>Blog</h1>
    <h3 v-if="isLoading">Loading...</h3>
    <ul v-if="posts">
      <li
        class="cursor-pointer hover:underline"
        v-for="post in posts"
        :key="post.id"
        @click="selectedPost = post"
      >
        {{ post.title }}
      </li>
    </ul>
    <div class="flex items-center justify-between mt-4 space-x-2">
      <button
        :disabled="currentPage <= 1"
        @click="currentPage--"
        class="px-2 py-1 border border-black rounded  disabled:cursor-not-allowed"
      >
        Previous page
      </button>
      <span>Page {{ currentPage }}</span>
      <button
        :disabled="currentPage >= maxPostPage"
        @click="currentPage++"
        class="px-2 py-1 border border-black rounded  disabled:cursor-not-allowed"
      >
        Next page
      </button>
    </div>
    <PostDetail
      v-if="selectedPost"
      :post="selectedPost"
      :key="selectedPost.id"
    />
  </div>
</template>

<script lang="ts">
import PostDetail from './PostDetail.vue'
export default defineComponent({
  name: 'Blog',
  components: { PostDetail },
})
</script>
<script lang="ts" setup>
import { useQuery, useQueryClient } from 'vue-query'
import axios from 'axios'
const queryClient = useQueryClient()
const getPosts = (pageNum: number) =>
  axios
    .get(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
    )
    .then((res) => res.data)

const maxPostPage = 10
const currentPage = ref(1)
const selectedPost = ref()
const key = reactive(['posts', { page: currentPage }])
const { data: posts, isLoading } = useQuery(key, () =>
  getPosts(currentPage.value)
)

watch(
  currentPage,
  (newVal) => {
    if (newVal >= maxPostPage) return
    const prefetchKey = reactive(['posts', { page: newVal + 1 }])
    queryClient.prefetchQuery(prefetchKey, () => getPosts(newVal + 1))
  },
  { immediate: true }
)
</script>

<style></style>
