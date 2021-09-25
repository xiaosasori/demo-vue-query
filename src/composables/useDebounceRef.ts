import { ref, customRef } from 'vue'

const debounce = (fn: Function, delay = 0) => {
  let timeout: number
  return (...args: any) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const useDebouncedRef = (initialValue: any, delay: number) => {
  const state = ref(initialValue)
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track()
      return state.value
    },
    set: debounce((value: any) => {
      console.log('set')
      state.value = value
      trigger()
    }, delay),
  }))
  return debouncedRef
}

export default useDebouncedRef
