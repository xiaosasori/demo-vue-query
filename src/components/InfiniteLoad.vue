<script lang="ts">
import { useIntersectionObserver } from '@/composables'

export default defineComponent({
  name: 'InfiniteLoad',
  emits: ['infinite-load'],
  props: {
    loading: Boolean,
    hasMore: Boolean,
  },
  setup(props, { emit }) {
    const containerRef = ref()
    const { isIntersecting } = useIntersectionObserver(containerRef)
    watch(isIntersecting, (val) => {
      if (val && !props.loading && props.hasMore) emit('infinite-load')
    })
    return () => h('div', { ref: containerRef })
  },
})
</script>
