<template>
  <div>
    <h3>{{ post.id }}: {{ post.title }}</h3>
    <button
      class="px-2 py-1 border border-black rounded"
      @click="mutate(post.id)"
    >
      Delete
    </button>
    <p v-if="isError" class="text-red-500">Error deleting the post</p>
    <p v-if="isLoading" class="text-purple-500">Deleting the post</p>
    <p v-if="isSuccess" class="text-green-500">Post has not been deleted</p>
    <p>{{ post.body }}</p>
    <h4 class="font-semibold">Comments</h4>
    <li v-for="comment in comments" :key="comment.id">
      {{ comment.email }}: {{ comment.body }}
    </li>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { useQuery, useMutation } from 'vue-query'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const getComments = (postId: string) =>
  axios
    .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then((res) => res.data)
const deletePost = (postId: string) =>
  axios
    .delete(`https://jsonplaceholder.typicode.com/postId/${postId}`)
    .then((res) => res.data)

const { data: comments } = useQuery(['comments', props.post.id], () =>
  getComments(props.post.id)
)

const { isLoading, isSuccess, isError, mutate } = useMutation(
  (postId: string) => deletePost(postId)
)
</script>

<style></style>
