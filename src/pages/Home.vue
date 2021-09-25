<template>
  <div>
    Home
    <Pokemon />
    <Berries />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Pokemon from '@/components/Pokemon.vue'
import Berries from '@/components/Berries.vue'

export default defineComponent({
  name: 'Home',
  components: { Pokemon, Berries },
  setup() {},
})
</script>

<style>
</style>
